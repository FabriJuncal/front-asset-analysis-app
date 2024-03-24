import { Component, Input, OnInit } from '@angular/core';
import { ICreateAccount } from '../../create-account.helper';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{

  @Input('updateParentModel') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;

  @Input() defaultValues: Partial<ICreateAccount>;

  constructor() {}

  ngOnInit() {
    this.updateParentModel({}, true);
  }
}
