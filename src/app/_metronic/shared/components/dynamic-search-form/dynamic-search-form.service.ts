import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchField } from './dynamic-search-form.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicSearchFormService {

  private readonly _searchField  = new BehaviorSubject<SearchField[]>([]);
  private readonly _selectedFilters  = new BehaviorSubject<any[]>([]);
  private readonly _creationForm  = new BehaviorSubject<any[]>([]);

  public addFields(data: SearchField[]): void {
    this._searchField.next(data);
  }

  public getFields(): Observable<SearchField[]> {
    return this._searchField.asObservable();
  }

  public addFilters(data: any[]): void {
    this._selectedFilters.next(data);
  }

  public getFilters(): Observable<any[]> {
    return this._selectedFilters.asObservable();
  }

  public clearFilter(): void {
    this._selectedFilters.next([]);
  }

  public addCreationForm(creationFormComponent: any): void {
    this._creationForm.next(creationFormComponent);
  }

  public getCreationForm(): Observable<any[]> {
    return this._creationForm.asObservable();
  }
}
