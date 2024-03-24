import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestStateService } from '../../../../_metronic/shared/services/http-request-state.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  @Input() user_selected: any = null;
  @Output() trigger: EventEmitter<any> = new EventEmitter();


  errorMessage: string;
  isLoading$: any;
  isLoading = false;
  validatePassword = true;

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    private _httpRequestState: HttpRequestStateService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
    this.loadForm();
  }

  loadForm(){
    this.formGroup = this.fb.group({
      name: [this.user_selected.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      surname: [this.user_selected.surname, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      email: [this.user_selected.email, Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])],
      role_id: [this.user_selected.role_id, this.isControlRoleId],
      password: [null, Validators.compose([Validators.nullValidator, Validators.minLength(8), Validators.maxLength(255)])],
      cpassword: [null, Validators.compose([Validators.nullValidator, Validators.minLength(8), Validators.maxLength(255)])],
      idTypeUser: ['2'],
      state: [this.user_selected.state]
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

  isControlRoleId(control: FormControl){
    const selectedRole = control.value;
    if(selectedRole === '0'){
      return { roleIdInvalid: true};
    }

    return null;
  }

  validateConfirmPassword() {
    return this.formGroup.value.password === this.formGroup.value.cpassword
  }


  save(){
    if(this.formGroup.value.password && this.formGroup.value.cpassword){
      if(!this.validateConfirmPassword()){
        this.validatePassword = false;
        return;
      }
    }

    this._userService.update(this.user_selected.id, this.formGroup.value)
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
        this.trigger.emit(resp.user);
      }
    });

  }

}
