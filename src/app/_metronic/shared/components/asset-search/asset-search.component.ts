import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { HttpRequestStateService } from '../../services/http-request-state.service';
import { AssetSearchModel, dataModel } from './asset-search.model';
import { AssetSearchService } from './asset-search.service';

@Component({
  selector: 'app-asset-search',
  standalone: false,
  templateUrl: './asset-search.component.html',
  styleUrl: './asset-search.component.scss'
})
export class AssetSearchComponent implements OnInit {

  @Output() trigger: EventEmitter<any> = new EventEmitter();

  private searchTextDebounce: Subject<string> = new Subject<string>();

  // Se crea esta variable privada para almacenar la última cadena de búsqueda introducida por el usuario.
  // Y así evitar que se ejecute la petición dos veces.
  private _lastSearchText: string = '';

  private assetSearchConfigSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente
  private assetDataSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente
  // private recentSearchesSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente

  isLoading$: Observable<number>;
  isLoading = false;

  assetSearchConfig: AssetSearchModel;
  assets: dataModel[];
  recentSearches: any[];
  searchText: string = '';

  constructor(
    private _httpRequestState: HttpRequestStateService,
    private _assetSearchService: AssetSearchService
  ) {
    this.searchTextDebounce.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.search();
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();

    // Obtiene las configuraciones para el buscador de activos
    this.assetSearchConfigSubscription = this._assetSearchService.getConfig().subscribe((config) => {
      this.assetSearchConfig = config;
    });

    this.assetDataSubscription = this._assetSearchService.getData().subscribe((data) =>{
      console.log('this._assetSearchService.getData()', data);
      this.assets = data;
    });

    // this.recentSearchesSubscription = this._assetSearchService.getRecentSearches().subscribe((searches) =>{
    //   this.recentSearches = searches;
    // });

    // this.recentSearchesSubscription = this._assetSearchService.getTextSearch().subscribe((searches) =>{
    //   console.log('v->', this.assets.length);
    //   this.searchText = searches;
    // });

    // Cargar las búsquedas recientes desde el localStorage
    // const recentSearchesString = localStorage.getItem('recentSearches');
    // if (recentSearchesString) {
    //   this.recentSearches = JSON.parse(recentSearchesString);
    // }
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
    this.trigger.emit(asset);
  }

  ngOnDestroy(): void {
    // Se limpia los Observables si el componente se destruye
    this.assetSearchConfigSubscription.unsubscribe();
    this.assetDataSubscription.unsubscribe();
  }
}
