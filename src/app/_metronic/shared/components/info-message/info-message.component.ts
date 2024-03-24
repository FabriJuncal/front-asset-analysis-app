import { Component, Input } from '@angular/core';
import { InfoMessageModel } from './info-message.model';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent {
  @Input() options: InfoMessageModel;
}
