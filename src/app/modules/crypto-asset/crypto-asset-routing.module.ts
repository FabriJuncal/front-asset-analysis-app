import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoAssetComponent } from './crypto-asset.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoAssetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoAssetRoutingModule { }
