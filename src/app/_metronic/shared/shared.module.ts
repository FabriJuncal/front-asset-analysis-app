import {NgModule} from '@angular/core';
import {KeeniconComponent} from './components/keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    KeeniconComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    KeeniconComponent,
    TooltipDirective
  ]
})
export class SharedModule {
}
