import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { WizardsRoutingModule } from './wizards-routing.module';
import { WizardsComponent } from './wizards.component';
import { Step1Component } from './steps/step1/step1.component';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { Step4Component } from './steps/step4/step4.component';
import { Step5Component } from './steps/step5/step5.component';
import { SharedModule } from "../../_metronic/shared/shared.module";
import { WelcomeComponent } from './steps/welcome/welcome.component';
import { AccountTypeComponent } from './steps/account-type/account-type.component';
import { BusinessDetailsComponent } from './steps/business-details/business-details.component';
import { BusinessBrandingComponent } from './steps/business-branding/business-branding.component';
import { ImageService } from '../../components/services/image.service';

@NgModule({
  declarations: [
    HorizontalComponent,
    VerticalComponent,
    WizardsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    WelcomeComponent,
    AccountTypeComponent,
    BusinessDetailsComponent,
    BusinessBrandingComponent
  ],
  imports: [
    CommonModule,
    WizardsRoutingModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    SharedModule
  ],
  providers:[
    ImageService
  ]
})
export class WizardsModule {}
