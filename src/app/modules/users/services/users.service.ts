import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService, FilterUserModel, UserModel } from '../../auth';
import { catchError, finalize } from 'rxjs/operators';
import { HttpRequestStateService } from '../../../_metronic/shared/services/http-request-state.service';
import { Observable, of } from 'rxjs';

const API_AUTH_URL = `${environment.apiUrl}/admin`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private _httpRequestState: HttpRequestStateService
  ) {}

  registration(data: UserModel){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<UserModel>(`${API_AUTH_URL}/register`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  allUsers(page = 1, filter?: FilterUserModel): Observable<UserModel[]> {

    this._httpRequestState.onRequestStart();

    if (!this.authService.token) {
      console.error('Auth token is not available');
      this._httpRequestState.onRequestEnd();
      return of([]);
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authService.token}` });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('rol', filter?.rol || '')
      .set('state', filter?.state  || '')
      .set('search', filter?.mailOrName || '');

    return this.http.get<UserModel[]>(`${API_AUTH_URL}/all`, { headers, params })
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd()),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  update(user_id: number, data: any){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.put<UserModel>(`${API_AUTH_URL}/update/${user_id}`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  delete(user_id: number){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.delete<UserModel>(`${API_AUTH_URL}/delete/${user_id}`, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }
}
