/**
 * `TabGroupComponent` es un componente que gestiona un grupo de pestañas.
 * Funciona en conjunto con `TabComponent` para mostrar las pestañas y su contenido.
 * Uso: <app-tab-group> <app-tab></app-tab> </app-tab-group>
 */
import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent {
  /** Lista de instancias de TabComponent proyectadas en el contenido del componente */
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  /** Hook de ciclo de vida llamado después de proyectar contenido en el componente */
  ngAfterContentInit() {
    // Seleccionar la primera pestaña si ninguna está marcada como activa
    let activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  /**
   * Método para manejar la selección de una pestaña.
   * @param tab - Instancia de TabComponent que se va a seleccionar
   */
  selectTab(tab: TabComponent) {
    // Desactivar todas las pestañas y luego activar la pestaña seleccionada
    this.tabs.toArray().forEach((tab) => tab.active = false);
    tab.active = true;
  }

  /**
   * Método para prevenir el comportamiento predeterminado de un evento.
   * @param event - Objeto de evento para prevenir el comportamiento predeterminado
   */
  prefentDefault(event: any){
    event.preventDefault();
  }
}

