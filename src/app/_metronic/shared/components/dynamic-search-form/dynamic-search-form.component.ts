import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchField } from './dynamic-search-form.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicSearchFormService } from './dynamic-search-form.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dynamic-search-form',
  templateUrl: './dynamic-search-form.component.html',
  styleUrls: ['./dynamic-search-form.component.scss']
})
export class DynamicSearchFormComponent implements OnInit {
  searchFields: SearchField[] = [];
  @Output() searchSubmit: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  creationFormComponent: any;
  private filterSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente
  private creationFormComponentSubscription: Subscription; // Almacena la suscripción para limpiarla posteriormente

  constructor(
    private fb: FormBuilder,
    private modelService: NgbModal,
    private readonly _dynamicSearchFormService: DynamicSearchFormService
  ){}

  ngOnInit(): void {
    // Obtiene los campos y los configura en el FormGroup
    this._dynamicSearchFormService.getFields().subscribe((data) => {
      this.searchFields = this.sortByOrder(data);
      this.form = this.fb.group({});
      this.filterSubscription = this._dynamicSearchFormService.getFilters()
        .subscribe((filter: any) => {
          this.searchFields.forEach(field => {
            this.form.addControl(field.name, this.fb.control(filter[field.name]));
          });
        });
    });

    this.creationFormComponentSubscription = this._dynamicSearchFormService.getCreationForm().subscribe((creationFormComponent) =>{
      this.creationFormComponent = creationFormComponent;
    });
  }

  onSearch(): void {
    this.searchSubmit.emit(this.form.value);
    this.filterSubscription.unsubscribe(); // Limpia el Observable al ejecutar la búsqueda
  }

  clearFilterAndRefreshTable(): void {
    // Restablecer los valores del formulario a sus valores predeterminados
    this.form.reset();

    // Desactivar las suscripciones a los filtros
    this.filterSubscription.unsubscribe();

    // Obtener los campos de búsqueda
    this._dynamicSearchFormService.getFields().subscribe((data) => {
      this.searchFields = this.sortByOrder(data);

      // Volver a crear el formulario con los campos de búsqueda actualizados
      this.form = this.fb.group({});
      this.searchFields.forEach((field) => {
        this.form.addControl(field.name, this.fb.control(null));
      });

      // Notificar al servicio de búsqueda que se ha limpiado el filtro
      this._dynamicSearchFormService.clearFilter();

      // Refrescar la tabla
      this.onSearch();
    });
  }

  openFormAlta(): void{
    const modalRef = this.modelService.open(this.creationFormComponent, { centered: true, size: 'md' });
    modalRef.result.then(
      () => {
        // Handle success
      },
      () => {
        // Handle dismissal
      }
    );

    // modalRef.componentInstance.trigger.subscribe((resp: any) => {
    //   // Ejecutar el método que recarga la tabla para hacerlo generico
    //   this.users.unshift(resp);
    // }
  }

  sortByOrder(campos: SearchField[]): SearchField[] {
    return campos.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe(); // Limpia el Observable si el componente se destruye
  }
}
