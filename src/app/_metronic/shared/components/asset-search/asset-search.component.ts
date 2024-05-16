import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { HttpRequestStateService } from '../../services/http-request-state.service';
import { AssetSearchModel, dataModel } from './asset-search.model';
import { AssetSearchService } from './asset-search.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asset-search',
  standalone: false,
  templateUrl: './asset-search.component.html',
  styleUrl: './asset-search.component.scss'
})
export class AssetSearchComponent implements OnInit {

  @Output() trigger: EventEmitter<any> = new EventEmitter();

  private readonly MAX_STORAGE_SIZE = 10; // Tamaño Maximo de Registros en el LocalStorage (Utilizado para mostrar los ultimos activos buscados)

  private searchTextDebounce: Subject<string> = new Subject<string>();

  // Se crea esta variable privada para almacenar la última cadena de búsqueda introducida por el usuario.
  // Y así evitar que se ejecute la petición dos veces.
  private _lastSearchText: string = '';

  private assetSearchConfigSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente
  private assetDataSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente
  // private recentSearchesSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente

  isLoading$: Observable<number>;
  isLoading = false;
  isfirstSearch = true;
  isShowRecentSearh = false;
  isNotExist = false;

  assetSearchConfig: AssetSearchModel;
  assets: dataModel[] = [];
  recentSearches: any[] = [];
  searchText: string = '';

  constructor(
    private _httpRequestState: HttpRequestStateService,
    private _assetSearchService: AssetSearchService,
    private modal: NgbActiveModal
  ) {
    this.searchTextDebounce.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.search();
    });
  }

  ngOnInit(): void {
    // Obtiene el estado para verificar si hay algúna petición pendiente para mostrar el loader
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();

    // Obtiene las configuraciones para el buscador de activos
    this.assetSearchConfigSubscription = this._assetSearchService.getConfig().subscribe((config) => {
      this.assetSearchConfig = config;
    });

    // Obtiene las los registros encontrados
    this.assetDataSubscription = this._assetSearchService.getData().subscribe ((data) =>{
      this.assets = data;
      this.recentSearches = [];
      // Bandera para mostrar mensaje cuando no se encontró ningún registro.
      this.isNotExist = !this.assets ? true : false;
      // Modificamos la variable que detecta si es la primera busqueda.
      // Se utiliza para ocultar antes de la 1ra busqueda el mensaje cuando no se encuentran registros.
      this.isfirstSearch = false;
    });

    // Cargar las búsquedas recientes desde el localStorage
    this.recentSearches = this.getDataStorage(this.assetSearchConfig.localStorageName);
    this.isShowRecentSearh = this.recentSearches.length > 0 && this.assets.length === 0;
  }


  private search(): void {
    if (!this.searchText) return;
    this._assetSearchService.addTextSearch(this.searchText);
  }

  // Método para realizar la búsqueda
  onKeyUp(): void {
    if (!this.searchText) return;
    if (this.searchText === this._lastSearchText) return;

    this._lastSearchText = this.searchText;

    // Debounce de 3 segundos antes de ejecutar la petición
    this.searchTextDebounce.next(this.searchText);
  }

  selectAssetPair(asset: dataModel){
    this.assets = [];
    this.recentSearches = [];
    this.isfirstSearch = true;
    this.loadDataStorage(this.assetSearchConfig.localStorageName, asset);
    this.modal.close();
    this.trigger.emit(asset);
  }

  private getDataStorage<T>(nameStorage: string): T[] {
    const storedData = localStorage.getItem(nameStorage);
    if (storedData) {
      try {
        return JSON.parse(storedData) as T[];
      } catch (error) {
        console.error(`Error al obtener los datos del Localstorage:`, error);
        return [];
      }
    } else {
      return [];
    }
  }

  loadDataStorage<T>(nameStorage: string, data: dataModel) {
    const storedData = this.getDataStorage<dataModel>(nameStorage);
    const existingAsset = storedData.find(asset => asset.name === data.name);
    if (!existingAsset) {
      storedData.unshift(data);
      if (storedData.length > this.MAX_STORAGE_SIZE) {
        storedData.pop();
      }
      localStorage.setItem(nameStorage, JSON.stringify(storedData));
    }else{
      const storedDataFilter = storedData.filter((asset) => {
        return asset.name !== data.name;
      });
      storedDataFilter.unshift(data);
      localStorage.setItem(nameStorage, JSON.stringify(storedDataFilter));
    }
  }

  ngOnDestroy(): void {
    // Se limpia los Observables si el componente se destruye
    this.assetSearchConfigSubscription.unsubscribe();
    this.assetDataSubscription.unsubscribe();
  }
}
