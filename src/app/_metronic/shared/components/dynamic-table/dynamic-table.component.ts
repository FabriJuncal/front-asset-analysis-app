import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() records: any[] = []; // Array que contendrá los datos a mostrar
  @Input() fields: any[] = []; // Array con los nombres de las columnas a mostrar


  constructor() { }

  ngOnInit(){
    // Subscribe a los Observables de datos y columnas
    // this._datos$.subscribe(datos => this.datos = datos);
    // this._columnas$.subscribe(columnas => this.columnas = columnas);
  }

}
