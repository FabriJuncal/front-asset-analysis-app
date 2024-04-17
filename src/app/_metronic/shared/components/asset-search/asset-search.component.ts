import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { CryptoAssetService } from 'src/app/modules/crypto-asset/services/crypto-asset.service';
import { HttpRequestStateService } from '../../services/http-request-state.service';

@Component({
  selector: 'app-asset-search',
  standalone: false,
  templateUrl: './asset-search.component.html',
  styleUrl: './asset-search.component.scss'
})
export class AssetSearchComponent {

  @Input() assetSearchConfig: any[] = []; // Array que contendrá los datos a mostrar

  private searchTextDebounce: Subject<string> = new Subject<string>();

  // Se crea esta variable privada para almacenar la última cadena de búsqueda introducida por el usuario.
  // Y así evitar que se ejecute la petición dos veces.
  private _lastSearchText: string = '';

  isLoading$: Observable<number>;
  isLoading = false;
  title: string = 'Búsqueda de Criptomonedas';
  subTitle: string = '';
  searchPlaceholder: string = 'Buscá por el símbolo o nombre de la criptomoneda';
  addButtonLabel: string = 'Add Selected Users';
  emptyMessage: string = '';
  emptySubMessage: string = 'Try to search by username, full name or email...';
  searchText: string = '';
  recentSearches: any[] = [
    {id: 1, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'BTC/USDT', exchange: 'Binance'},
    {id: 2, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'ETH/USDT', exchange: 'Binance'},
  ];
  assets: any; // Array para almacenar los resultados de la búsqueda
  // userRoles: any[] = [
  //   { label: 'Guest', value: 1 },
  //   { label: 'Owner', value: 2 },
  //   { label: 'Can Edit', value: 3 }
  // ];

  constructor(
    private cryptoAssetService: CryptoAssetService,
    private _httpRequestState: HttpRequestStateService,
  ) {
    this.searchTextDebounce.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.search();
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
    // Cargar las búsquedas recientes desde el localStorage
    const recentSearchesString = localStorage.getItem('recentSearches');
    if (recentSearchesString) {
      this.recentSearches = JSON.parse(recentSearchesString);
    }
  }

  // Método para realizar la búsqueda
  onKeyUp(): void {
    if (!this.searchText) return;
    if (this.searchText === this._lastSearchText) return;

    this._lastSearchText = this.searchText;

    // Debounce de 3 segundos antes de ejecutar la petición
    this.searchTextDebounce.next(this.searchText);
  }

  private search(): void {
    if (!this.searchText) return;

    this.cryptoAssetService.getCryptosPairs(this.searchText)
      .subscribe((data) => {
        console.log('this.cryptoAssetService.getCryptosPairs->', data);

        if(data?.error){
          this.emptyMessage = data?.error
          this.assets = [];
          return;
        }
        this.emptyMessage = '';
        this.assets = data.cryptosPairs;

        // Lógica para realizar la búsqueda utilizando data
        // y almacenar los resultados en this.users
        // ...
        // Almacenar la búsqueda reciente
        // this.saveRecentSearch(this.searchText);
      });
  }

  // Método para guardar la búsqueda reciente
  saveRecentSearch(searchText: string): void {
    // Agregar la búsqueda reciente al principio del array
    this.recentSearches.unshift(searchText);
    // Limitar la cantidad de búsquedas recientes a 5
    this.recentSearches = this.recentSearches.slice(0, 5);
    // Guardar las búsquedas recientes en el localStorage
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }
}
