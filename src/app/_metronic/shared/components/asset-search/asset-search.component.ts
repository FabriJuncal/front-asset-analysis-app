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

  private readonly MAX_STORAGE_SIZE = 10; // Maximum number of items to store

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
      console.log('this._assetSearchService.getData()', data);
      this.assets = data;
      this.recentSearches = [];
      // Bandera para mostrar mensaje cuando no se encontró ningún registro.
      this.isNotExist = !this.assets ? true : false;
      // Modificamos la variable que detecta si es la primera busqueda.
      // Se utiliza para ocultar antes de la 1ra busqueda el mensaje cuando no se encuentran registros.
      this.isfirstSearch = false;
    });

    // this.recentSearchesSubscription = this._assetSearchService.getRecentSearches().subscribe((searches) =>{
    //   this.recentSearches = searches;
    // });

    // this.recentSearchesSubscription = this._assetSearchService.getTextSearch().subscribe((searches) =>{
    //   console.log('v->', this.assets.length);
    //   this.searchText = searches;
    // });

    // Cargar las búsquedas recientes desde el localStorage
    const recentSearchesString = localStorage.getItem(this.assetSearchConfig.localStorageName);
    console.log('recentSearchesString->', recentSearchesString);
    if (recentSearchesString) {
      this.recentSearches = JSON.parse(recentSearchesString);
    }

    this.getDataStorage(this.assetSearchConfig.localStorageName);

    console.log('this.isfirstSearch->', this.isfirstSearch);
    console.log('this.isNotExist->', this.isNotExist);
    console.log('this.assets->', this.assets);
    console.log('this.recentSearches->', this.recentSearches);
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
    console.log('asset->', asset);
    this.assets = [];
    this.loadDataStorage(this.assetSearchConfig.localStorageName, asset);
    this.trigger.emit(asset);
    this.modal.close();
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

  loadDataStorage<T>(nameStorage: string, data: T) {
    const storedData = this.getDataStorage<T>(nameStorage);
    storedData.push(data);
    if (storedData.length > this.MAX_STORAGE_SIZE) {
      storedData.shift();
    }

    localStorage.setItem(nameStorage, JSON.stringify(storedData));
  }

  ngOnDestroy(): void {
    // Se limpia los Observables si el componente se destruye
    this.assetSearchConfigSubscription.unsubscribe();
    this.assetDataSubscription.unsubscribe();
  }
}
