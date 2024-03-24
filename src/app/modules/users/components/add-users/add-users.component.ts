import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';

import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../roles/services/roles.service';
import { RolModel } from 'src/app/modules/roles/models/roles.model';
import { HttpRequestStateService } from '../../../../_metronic/shared/services/http-request-state.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit  {

  @Output() trigger: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  isLoading$: any;
  isLoading = false;
  validatePassword = true;

  selectedRol: string;
  roles: RolModel[];

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    private _rolesService: RolesService,
    private _httpRequestState: HttpRequestStateService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
    this._rolesService.roles$
    .subscribe((value) => this.roles = value.roles.data)


    this.loadForm();
  }

  // convenience getter for easy access to form fields
  // get f() {
  //   return this.formGroup.controls;
  // }

  loadForm(){
    this.formGroup = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      surname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      email: [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])],
      role_id: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])],
      cpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])],
      idTypeUser: ['2']
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  validateConfirmPassword() {
    return this.formGroup.value.password === this.formGroup.value.cpassword
  }

  save(){
    if(!this.validateConfirmPassword()){
      this.validatePassword = false;
      return;
    }

    this._userService.registration(this.formGroup.value)
    .pipe(
      catchError((message) => {
        this.errorMessage = message.error.errors;
        this.toastr.error(this.errorMessage);

        return of(undefined);
      })
    ).subscribe((resp:any) => {
      if(resp && resp.status){
        this.modal.close();
        this.toastr.success(resp.message);
        this.trigger.emit(resp.user);
      }
    });

  }

}
