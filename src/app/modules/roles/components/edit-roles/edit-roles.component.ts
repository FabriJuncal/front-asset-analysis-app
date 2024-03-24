import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RolModel } from '../../models/roles.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { RolesService } from '../../services/roles.service';
import { HttpRequestStateService } from '../../../../_metronic/shared/services/http-request-state.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent {

  @Input() rol_selected: RolModel;
  @Output() rolesE: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  isLoading$: any;
  isLoading = false;

  isValidName = false;

  name: string;

  constructor(
    private _rolesService: RolesService,
    private _httpRequestState: HttpRequestStateService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
    this.loadForm();
    // this.initComponents();
  }

  loadForm(){
    this.name = this.rol_selected.name;
  }

  save(){

    if(this.validateFields()){
      this.toastr.error('DEBE COMPLETAR TODOS LOS CAMPOS');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    this._rolesService.updateRol(this.rol_selected.id, formData)
    .pipe(
      catchError((message) => {
        this.errorMessage = message.error.errors;
        this.toastr.error(this.errorMessage);
        return of(undefined);
      })
    ).subscribe((resp:any) => {
      if(resp.status){
        this.toastr.success(resp.message);
        this.modal.close();
        this.rolesE.emit(resp.rol);
      }
    });
  }

  // Método que se utiliza para iniciar componentes
  // initComponents(){
  // }

  validateFields(){
    this.isValidName = this.name ? false : true;

    if(this.isValidName){
      return true;
    }

    return false;
  }


}
