import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestStateService {

  private requestCount = 0;
  private requestCountSubject = new BehaviorSubject<number>(0);

  constructor() { }

  public onRequestStart(): void {
    this.requestCount++;
    this.requestCountSubject.next(this.requestCount);
  }

  public onRequestEnd(): void {
    this.requestCount--;
    if (this.requestCount < 0) {
      this.requestCount = 0;
    }
    this.requestCountSubject.next(this.requestCount);
  }

  public getRequestState(): Observable<number> {
    return this.requestCountSubject.asObservable();
  }
}
