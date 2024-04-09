import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetSearchComponent } from '../../_metronic/shared/components/asset-search/asset-search.component';


@Component({
  selector: 'app-crypto-asset',
  templateUrl: './crypto-asset.component.html',
  styleUrl: './crypto-asset.component.scss'
})
export class CryptoAssetComponent {

  crypto: any;

  constructor(private modelService: NgbModal){}

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

    // modalRef.componentInstance.trigger.subscribe((resp: any) => {
    //   this.crypto.unshift(resp);
    // });
  }
}
