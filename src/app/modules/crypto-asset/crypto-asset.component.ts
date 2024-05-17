import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetSearchComponent } from '../../_metronic/shared/components/asset-search/asset-search.component';
import { AssetSearchService } from '../../_metronic/shared/components/asset-search/asset-search.service';
import { CryptoAssetService } from './services/crypto-asset.service';
import { AssetSearchModel } from '../../_metronic/shared/components/asset-search/asset-search.model';
import { Subscription } from 'rxjs';
import { CryptoAssetModel } from './models/crypto-asset.model';


@Component({
  selector: 'app-crypto-asset',
  templateUrl: './crypto-asset.component.html',
  styleUrl: './crypto-asset.component.scss'
})
export class CryptoAssetComponent implements OnInit{

  AssetSearchSetting: AssetSearchModel;
  recentSearches: any;

  constructor(
    private modelService: NgbModal,
    private _assetSearchService: AssetSearchService,
    private _cryptoAssetService: CryptoAssetService
  ){}

  ngOnInit(): void{
    this.initComponents();
    this._assetSearchService.getTextSearch().subscribe((searchText) => {
      this.searchCryptos(searchText);
    });
  }

  openAssetSearchModal(): void{
    const modalRef = this.modelService.open(AssetSearchComponent, { centered: true, size: 'md' });
    modalRef.result.then(
      () => {
        // Handle success
      },
      () => {
        // Handle dismissal
      }
    );

    modalRef.componentInstance.trigger.subscribe((crypto: CryptoAssetModel) => {
      const filterTradingView = `BINANCE:${crypto.symbol}USDT`;
      this._assetSearchService.addAssetSelected(filterTradingView);
    });
  }

  searchCryptos(searchCrypto: string){
    const page = 1;
    this._cryptoAssetService.getCryptos(page, searchCrypto)
    .subscribe((resp) => {
      console.log('this._cryptoAssetService.getCryptos->', resp);
      const cryptos = resp.cryptos ? resp.cryptos.data : [];
      this._assetSearchService.addData(cryptos);
    });
  }

  initComponents(): void{

    this.AssetSearchSetting = {
      title: 'Búsqueda de Criptomonedas',
      subTitle: '',
      searchPlaceholder: 'Símbolo o Nombre',
      addButtonLabel: 'Add Selected Users',
      emptyMessage: 'Ninguna criptomoneda coincide.',
      emptySubMessage: '¿Quieres intentarlo de nuevo?',
      localStorageName: 'recentSearchesCryptos'
    }

    this.recentSearches = [
      {id: 1, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'BTC/USDT', exchange: 'Binance'},
      {id: 2, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'ETH/USDT', exchange: 'Binance'}
    ]

    this._assetSearchService.addConfig(this.AssetSearchSetting);
    // this._assetSearchService.addRecentSearches(this.recentSearches);
  }

}
