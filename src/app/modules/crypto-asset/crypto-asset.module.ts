import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalAnalysisComponent } from './technical-analysis/technical-analysis.component';
import { CryptoAssetComponent } from './crypto-asset.component';
import { CryptoAssetRoutingModule } from './crypto-asset-routing.module';
import { ComponentsModule } from '../../_metronic/shared/components/components.module';
import { FundamentalAnalysisComponent } from './fundamental-analysis/fundamental-analysis.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CryptoAssetComponent,
    TechnicalAnalysisComponent,
    FundamentalAnalysisComponent
  ],
  imports: [
    CryptoAssetRoutingModule,
    CommonModule,
    ComponentsModule,
    NgbModule
  ]
})
export class CryptoAssetModule { }
