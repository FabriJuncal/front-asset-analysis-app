import { Component, Input, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UploadMultiImage } from './upload-multi-image';

@Component({
  selector: 'app-upload-multi-image',
  templateUrl: './upload-multi-image.component.html',
  styleUrls: ['./upload-multi-image.component.scss']
})
export class UploadMultiImageComponent implements OnInit  {

  public config: DropzoneConfigInterface;

  // PARA VER MAS OPCIONES DE CONFIGURACIÓN VER LA SIGUIENTE DOCUMENTACIÓN: https://docs.dropzone.dev/configuration/basics/configuration-options
  @Input() options: UploadMultiImage;

  constructor() {}

  ngOnInit(){
    this.config = {
      clickable: true,
      maxFiles: this.options.countFile,
      addRemoveLinks: true,
      autoReset: null,
      errorReset: null,
      cancelReset: null
    };
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }
}
