import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { AddRolesComponent } from './components/add-roles/add-roles.component';
import { EditRolesComponent } from './components/edit-roles/edit-roles.component';
import { DeleteRolesComponent } from './components/delete-roles/delete-roles.component';
import { NgbActiveModal, NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ComponentsModule } from '../../_metronic/shared/components/components.module';

@NgModule({
  declarations: [
    RolesComponent,
    RolesListComponent,
    AddRolesComponent,
    EditRolesComponent,
    DeleteRolesComponent
  ],
  providers: [
    NgbActiveModal,
    NgbPagination
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    WidgetsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule
  ]
})
export class RolesModule { }
