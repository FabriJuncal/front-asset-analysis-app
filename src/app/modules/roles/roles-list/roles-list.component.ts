import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../_metronic/partials/layout/modals/modal/modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfig } from '../../../_metronic/partials/layout/modals/modal.config';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../services/roles.service';
import { AddRolesComponent } from '../components/add-roles/add-roles.component';
import { EditRolesComponent } from '../components/edit-roles/edit-roles.component';
import { DeleteRolesComponent } from '../components/delete-roles/delete-roles.component';
import { HttpRequestStateService } from '../../../_metronic/shared/services/http-request-state.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {

  @ViewChild('modal') private modalComponent: ModalComponent;

  formGroup: FormGroup

  modalAddRol: ModalConfig = {
    modalTitle: 'Crear Rol',
  };

  isLoading$: Observable<number>;
  isLoading = false;
  totalPages = 1;
  currentPage = 1;

  search: string;

  roles: any = [];
  validatePassword: any;

  constructor(
    private fb: FormBuilder,
    private _rolesService: RolesService,
    private _httpRequestState: HttpRequestStateService,
    private modelService: NgbModal
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
    this.allRoles();
  }

  allRoles(page = 1){
    this._rolesService.getRoles(page, this.search)
    .subscribe((resp:any) => {
      console.log('allRoles->',resp);
      this.roles = resp.roles.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  reset(){
    this.search = '';
    this.allRoles()
  }

  addRol(){
    const modalRef = this.modelService.open(AddRolesComponent, {centered: true, size: 'md'});
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )

    modalRef.componentInstance.rolesE.subscribe((resp:any) => {
      this.roles.unshift(resp);
    });
  }

  loadPage(index: any){
    this.allRoles(index);
  }

  editRol(rol: any){
    const modalRef = this.modelService.open(EditRolesComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.rol_selected = rol;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )

    modalRef.componentInstance.rolesE.subscribe((resp:any) => {
      const INDEX = this.roles.findIndex((rol: any) => rol.id === resp.id);
      this.roles[INDEX] = resp;
    });
  }

  deleteRol(rol: any){
    const modalRef = this.modelService.open(DeleteRolesComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.rol_selected = rol;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )

    modalRef.componentInstance.rolesE.subscribe((resp:any) => {
      const INDEX = this.roles.findIndex((rol: any) => rol.id === resp.id);
      this.roles.splice(INDEX, 1);
    });
  }

}
