import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, delay, startWith } from 'rxjs/operators';
import { CryptoAssetService } from 'src/app/modules/crypto-asset/services/crypto-asset.service';
import { HttpRequestStateService } from '../../services/http-request-state.service';

@Component({
  selector: 'app-asset-search',
  standalone: false,
  templateUrl: './asset-search.component.html',
  styleUrl: './asset-search.component.scss'
})
export class AssetSearchComponent {

  private searchTextDebounce: Subject<string> = new Subject<string>();

  // Se crea esta variable privada para almacenar la última cadena de búsqueda introducida por el usuario.
  // Y así evitar que se ejecute la petición dos veces.
  private _lastSearchText: string = '';

  isLoading$: Observable<number>;
  isLoading = false;
  title: string = 'Search Users';
  subTitle: string = 'Invite Collaborators To Your Project';
  searchPlaceholder: string = 'Search by username, full name or email...';
  addButtonLabel: string = 'Add Selected Users';
  emptyMessage: string = 'No users found';
  emptySubMessage: string = 'Try to search by username, full name or email...';
  searchText: string = '';
  recentSearches: any[] = [
    {id: 1, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'BTC/USDT', exchange: 'Binance'},
    {id: 2, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'ETH/USDT', exchange: 'Binance'},
  ];
  users: any[] = [
    {id: 1, avatar: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', name: 'Emma Smith', email: 'emma_smith@gmail.com'},
    {id: 2, avatar: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', name: 'Melody Macy', email: 'melody_macy@gmail.com'},
    {id: 3, avatar: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', name: 'Max Smith', email: 'max_smith@gmail.com'},
    {id: 4, avatar: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', name: 'Sean Bean', email: 'sean_bean@gmail.com'},
  ]; // Array para almacenar los resultados de la búsqueda
  userRoles: any[] = [
    { label: 'Guest', value: 1 },
    { label: 'Owner', value: 2 },
    { label: 'Can Edit', value: 3 }
  ];

  constructor(
    private cryptoAssetService: CryptoAssetService,
    private _httpRequestState: HttpRequestStateService,
  ) {
    this.searchTextDebounce.pipe(
      debounceTime(3000)
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
