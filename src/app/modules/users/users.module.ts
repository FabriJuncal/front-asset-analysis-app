import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbPagination, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { DeleteUsersComponent } from './components/delete-users/delete-users.component';
import { WidgetsModule } from '../../_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ComponentsModule } from '../../_metronic/shared/components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
    declarations: [
        UsersComponent,
        UsersListComponent,
        AddUsersComponent,
        EditUsersComponent,
        DeleteUsersComponent
    ],
    providers: [
        NgbActiveModal,
        NgbPagination
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        WidgetsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        NgbModule,
        NgSelectModule
    ]
})
export class UsersModule { }
