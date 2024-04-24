import { Injectable } from '@angular/core';
import { AssetSearchModel, dataModel } from './asset-search.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetSearchService {
  assetSearchConfig: AssetSearchModel[]
  private readonly _assetSearchConfig$ = new BehaviorSubject<AssetSearchModel>({
    title: '',
    subTitle: '',
    searchPlaceholder: '',
    addButtonLabel: '',
    emptyMessage: '',
    emptySubMessage: ''
  });
  private readonly _data$ = new BehaviorSubject<dataModel[]>([]);
  private readonly _recentSearches$ = new BehaviorSubject<any[]>([]);
  private readonly _textSearch$ = new Subject<string>();

  constructor() { }

  public addConfig(config: AssetSearchModel): void {
    console.log('addConfig->',config);
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

  public addTextSearch(text: string): void {
    console.log('addTextSearch->',text);
    this._textSearch$.next(text);
  }

  public getTextSearch(): Observable<string> {
    return this._textSearch$.asObservable();
  }

  public clearTextSearch(): void {
    this._textSearch$.next('');
  }
}
