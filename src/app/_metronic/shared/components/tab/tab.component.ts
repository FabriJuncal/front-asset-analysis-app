/**
 * `TabComponent` es un componente utilizado en conjunto con `TabGroupComponent` para representar una pestaña.
 * Define el contenido de una pestaña y su título.
 * Uso: <app-tab title="Título de la pestaña">Contenido de la pestaña</app-tab>
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  /** Título de la pestaña */
  @Input() title: string;
  /** Estado que indica si la pestaña está activa o no */
  active = false;
}
