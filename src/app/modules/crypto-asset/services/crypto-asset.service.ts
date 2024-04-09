import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth';

const API_CRYPTO_URL = `${environment.apiUrl}/cryptos`;

@Injectable({
  providedIn: 'root'
})
export class CryptoAssetService {

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    ) { }

  getCryptos(page = 1, search: string = ''): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`,
    });

    let filter = '';
    if(search){
      filter = `${filter}&search=${search}`;
    }

    return this.http.get<any>(`${API_CRYPTO_URL}/all?page=${page}${filter}`, {
      headers: httpHeaders,
    });
  }

  getCryptosPairs(crypto: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`,
    });
    return this.http.get<any>(`${API_CRYPTO_URL}/${crypto}/pairs`, {
      headers: httpHeaders,
    });
  }
}
