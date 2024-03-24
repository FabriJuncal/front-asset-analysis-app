import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { HttpRequestStateService } from '../services/http-request-state.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private httpRequestStateService: HttpRequestStateService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.httpRequestStateService.onRequestStart();

    return next.handle(request).pipe(
      finalize(() => {
        this.httpRequestStateService.onRequestEnd();
      })
    );

  }
}
