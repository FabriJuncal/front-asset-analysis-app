import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetSearchComponent } from '../../_metronic/shared/components/asset-search/asset-search.component';
import { AssetSearchService } from '../../_metronic/shared/components/asset-search/asset-search.service';
import { CryptoAssetService } from './services/crypto-asset.service';
import { AssetSearchModel } from '../../_metronic/shared/components/asset-search/asset-search.model';


@Component({
  selector: 'app-crypto-asset',
  templateUrl: './crypto-asset.component.html',
  styleUrl: './crypto-asset.component.scss'
})
export class CryptoAssetComponent {

  crypto: any;
  AssetSearchSetting: AssetSearchModel;
  recentSearches: any;

  constructor(
    private modelService: NgbModal,
    private assetSearchService: AssetSearchService,
    private cryptoAssetService: CryptoAssetService
  ){}

  openAssetSearchModal(): void{
    const modalRef = this.modelService.open(AssetSearchComponent, { centered: true, size: 'lg' });
    modalRef.result.then(
      () => {
        // Handle success
      },
      () => {
        // Handle dismissal
      }
    );

    // modalRef.componentInstance.trigger.subscribe((resp: any) => {
    //   this.crypto.unshift(resp);
    // });
  }

  // searchCryptosPairs(){
  //   this.cryptoAssetService.getCryptosPairs(this.searchText)
  //   .subscribe((data) => {
  //     console.log('this.cryptoAssetService.getCryptosPairs->', data);

  //     // if(data?.error){
  //     //   this.emptyMessage = data?.error
  //     //   this.assets = [];
  //     //   return;
  //     // }
  //     // this.emptyMessage = '';
  //     // this.assets = data.cryptosPairs;

  //     // Lógica para realizar la búsqueda utilizando data
  //     // y almacenar los resultados en this.users
  //     // ...
  //     // Almacenar la búsqueda reciente
  //     // this.saveRecentSearch(this.searchText);
  //   });
  // }

  initComponents(){

    this.AssetSearchSetting = {
      title: 'Búsqueda de Criptomonedas',
      subTitle: '',
      searchPlaceholder: 'Buscá por el símbolo o nombre de la criptomoneda',
      addButtonLabel: 'Add Selected Users',
      emptyMessage: '',
      emptySubMessage: 'Try to search by username, full name or email...'
    }

    this.recentSearches = [
      {id: 1, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'BTC/USDT', exchange: 'Binance'},
      {id: 2, logo: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg', parCripto: 'ETH/USDT', exchange: 'Binance'}
    ]

    this.assetSearchService.addConfig(this.AssetSearchSetting);
    this.assetSearchService.addRecentSearches(this.recentSearches);
  }
}
