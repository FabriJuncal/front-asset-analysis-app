import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-colored-circle',
  templateUrl: './colored-circle.component.html',
  styleUrls: ['./colored-circle.component.scss']
})
export class ColoredCircleComponent {
  @Input() color: string;
  @Input() size: string;
}
