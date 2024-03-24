import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Image } from '../components/interfaces/image';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  uploadImage(image: Image): Observable<any> {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.token || !image.path  || !image.file) {
      return of<any>(undefined);
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.token}`,
    });
    const formData = new FormData();
    formData.append('path', image.path);
    formData.append('file', image.file);

    return this.http.post(`${environment.apiUrl}/upload-image`, formData, {
      headers: httpHeaders,
    });
  }

  deleteImage(image: Image): Observable<any> {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.token || !image.path  || !image.name) {
      return of<any>(undefined);
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.token}`,
    });
    const formData = new FormData();
    formData.append('path', image.path);
    formData.append('name', image.name);

    return this.http.post(`${environment.apiUrl}/delete-image`, formData, {
      headers: httpHeaders,
    });
  }
}
