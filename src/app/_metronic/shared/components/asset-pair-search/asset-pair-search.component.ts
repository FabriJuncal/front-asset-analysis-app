import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { HttpRequestStateService } from '../../services/http-request-state.service';
import { AssetPairSearchModel, dataModel } from './asset-pair-search.model';
import { AssetPairSearchService } from './asset-pair-search.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asset-pair-search',
  standalone: false,
  templateUrl: './asset-pair-search.component.html',
  styleUrl: './asset-pair-search.component.scss'
})
export class AssetPairSearchComponent implements OnInit {

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

  assetSearchConfig: AssetPairSearchModel;
  assets: dataModel[];
  recentSearches: any[];
  searchText: string = '';

  constructor(
    private _httpRequestState: HttpRequestStateService,
    private _assetPairSearchService: AssetPairSearchService,
    private modal: NgbActiveModal
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
    this.assetSearchConfigSubscription = this._assetPairSearchService.getConfig().subscribe((config) => {
      this.assetSearchConfig = config;
    });

    this.assetDataSubscription = this._assetPairSearchService.getData().subscribe((data) =>{
      console.log('this._assetPairSearchService.getData()', data);
      this.assets = data;
    });

    // this.recentSearchesSubscription = this._assetPairSearchService.getRecentSearches().subscribe((searches) =>{
    //   this.recentSearches = searches;
    // });

    // this.recentSearchesSubscription = this._assetPairSearchService.getTextSearch().subscribe((searches) =>{
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

    this._assetPairSearchService.addTextSearch(this.searchText);
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
    this.modal.close();
  }

  ngOnDestroy(): void {
    // Se limpia los Observables si el componente se destruye
    this.assetSearchConfigSubscription.unsubscribe();
    this.assetDataSubscription.unsubscribe();
  }
}
