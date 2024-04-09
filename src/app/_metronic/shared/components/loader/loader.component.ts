import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() isText: boolean; // Array que contendrá los datos a mostrar
  @Input() size: 'sm' | 'xl';
  @Input() styleComponent: object; // Array que contendrá los datos a mostrar
}
