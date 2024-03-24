import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  private tooltip: Tooltip | null = null; // Tipo Tooltip para tooltip

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.tooltip = new Tooltip(this.el.nativeElement);
    this.el.nativeElement.addEventListener('click', this.hideTooltip.bind(this)); // Bind this para mantener el contexto
  }

  ngOnDestroy(): void {
    if (this.tooltip) {
      this.tooltip.dispose(); // Limpiar el tooltip cuando se destruye la directiva
    }
  }

  private hideTooltip(): void {
    if (this.tooltip) {
      this.tooltip.hide(); // Ocultar el tooltip al hacer clic en el elemento
    }
  }
}
