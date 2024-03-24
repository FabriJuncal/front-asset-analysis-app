import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestStateService } from '../../../../_metronic/shared/services/http-request-state.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteUsersComponent implements OnInit {

  @Input() user_selected: any = null;
  @Output() trigger: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  isLoading$: any;
  isLoading = false;

  constructor(
    private _userService: UsersService,
    private _httpRequestState: HttpRequestStateService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
  }

  delete(){
    this._userService.delete(this.user_selected.id)
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
        this.trigger.emit(this.user_selected);
      }
    });
  }

}
