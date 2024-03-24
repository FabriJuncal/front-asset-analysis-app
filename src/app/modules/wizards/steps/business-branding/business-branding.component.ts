import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICreateAccount } from '../../create-account.helper';
import { UploadSingleImage } from '../../../../components/upload-single-image/upload-single-image';
import { UploadMultiImage } from '../../../../components/upload-multi-image/upload-multi-image';

@Component({
  selector: 'app-business-branding',
  templateUrl: './business-branding.component.html',
})
export class BusinessBrandingComponent implements OnInit, OnDestroy {
  @Input('updateParentModel') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;
  @Input() defaultValues: Partial<ICreateAccount>;
  form: FormGroup;
  uploadSingleImageOption: UploadSingleImage;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, true);
    this.initComponents();
  }

  initForm() {
    this.form = this.fb.group({
      businessDescriptor: [this.defaultValues.businessDescriptor, [Validators.required]],
      // businessDescriptor: [this.defaultValues.businessDescriptor, [Validators.required]],
      // businessDescriptor: [this.defaultValues.businessDescriptor, [Validators.required]],
      // businessDescriptor: [this.defaultValues.businessDescriptor, [Validators.required]],
      // businessDescriptor: [this.defaultValues.businessDescriptor, [Validators.required]],
      // businessDescriptor: [this.defaultValues.businessDescriptor, [Validators.required]],
      // businessDescriptor: [this.defaultValues.businessDescriptor, [Validators.required]]
    });

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  initUploadSingleImageComponent(){

  }

  initComponents(){
    this.uploadSingleImageOption = {
      title: '',
      description: 'Los clientes verán el logo de la marca en su estado de cuenta. Sólo se aceptan archivos de imagen *.png, *.jpg y *.jpeg',
      pathImage: 'logos'
    };
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
