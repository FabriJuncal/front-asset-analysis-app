import { Injectable } from '@angular/core';
import { AssetSearchModel, dataModel } from './asset-search.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetSearchService {
  assetSearchConfig: AssetSearchModel[]
  private readonly _assetSearchConfig$ = new Subject<AssetSearchModel>();
  private readonly _data$ = new Subject<dataModel[]>();
  private readonly _recentSearches$ = new Subject<any[]>();

  constructor() { }

  public addConfig(config: AssetSearchModel): void {
    this._assetSearchConfig$.next(config);
  }

  public getConfig(): Observable<AssetSearchModel> {
    return this._assetSearchConfig$.asObservable();
  }

  public addData(data: dataModel[]): void {
    this._data$.next(data);
  }

  public getData(): Observable<dataModel[]> {
    return this._data$.asObservable();
  }

  public clearData(): void {
    this._data$.next([]);
  }

  public addRecentSearches(data: dataModel[]): void {
    this._recentSearches$.next(data);
  }

  public getRecentSearches(): Observable<dataModel[]> {
    return this._recentSearches$.asObservable();
  }

  public clearRecentSearches(): void {
    this._recentSearches$.next([]);
  }
}
