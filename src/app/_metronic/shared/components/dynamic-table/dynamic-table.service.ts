import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicTableService{

  private readonly _datos$ = new Subject<any[]>();
  private readonly _columns$ = new Subject<string[]>();


  constructor() { }

  // public addColumns(columns): void {
  //   this._columns$.next(columns);
  // }

}


