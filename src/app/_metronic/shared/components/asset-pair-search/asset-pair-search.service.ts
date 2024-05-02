import { Injectable } from '@angular/core';
import { AssetPairSearchModel, dataModel } from './asset-pair-search.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetPairSearchService {

  assetSearchConfig: AssetPairSearchModel[]
  private readonly _assetSearchConfig$ = new BehaviorSubject<AssetPairSearchModel>({
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
  private readonly _assetSelected$ = new Subject<string>();

  constructor() { }

  public addConfig(config: AssetPairSearchModel): void {
    console.log('addConfig->',config);
    this._assetSearchConfig$.next(config);
  }

  public getConfig(): Observable<AssetPairSearchModel> {
    return this._assetSearchConfig$.asObservable();
  }

  // nameStorage: Define el nombre con el que se almacenará en el LocalStorage
  public addData(nameStorage: string, data: dataModel[]): void {
    localStorage.setItem(nameStorage, JSON.stringify(data));
    this._data$.next(data);
  }

  public getData(): Observable<dataModel[]> {
    return this._data$.asObservable();
  }

  public clearData(): void {
    this._data$.next([]);
  }

  public getRecentSearches(): Observable<dataModel[]> {
    return this._recentSearches$.asObservable();
  }

  public clearRecentSearches(): void {
    this._recentSearches$.next([]);
  }

  public addTextSearch(text: string): void {
    this._textSearch$.next(text);
  }

  public getTextSearch(): Observable<string> {
    return this._textSearch$.asObservable();
  }

  public clearTextSearch(): void {
    this._textSearch$.next('');
  }

  public addAssetSelected(asset: string){
    this._assetSelected$.next(asset);
  }

  public getAssetSelected(){
    return this._assetSelected$.asObservable();
  }
}
