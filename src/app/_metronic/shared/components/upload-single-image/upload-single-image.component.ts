import { Component, Input, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadSingleImage } from './upload-single-image';
import { ImageService } from '../../services/image.service';
import { Image } from '../interfaces/image';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-single-image',
  templateUrl: './upload-single-image.component.html',
  styleUrls: ['./upload-single-image.component.scss']
})
export class UploadSingleImageComponent implements OnInit {
  @Input() options: UploadSingleImage;
  @Output() imageSelected: EventEmitter<File> = new EventEmitter();

  uploadImage = false;;
  imageName: string;
  imagePreview: string;
  imageInputClass = 'image-input image-input-empty image-input-outline image-input-placeholder mb-3';

  constructor(
    private imageService: ImageService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
    ) {

  }

  ngOnInit(){
    this.cambiarImagenDeFondo();
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) {
      this.toastr.error('ERROR AL CARGAR LA IMAGEN, INTENTE NUEVAMENTE.');
      return;
    }

    if (inputElement.files[0].type.indexOf("image") < 0) {
      this.toastr.error('EL ARCHIVO CARGADO NO ES UNA IMAGEN');
      return;
    }

    const image: File =  inputElement.files[0];
    this.imageSelected.emit(image);

    // this.uploadImage(imageSelected);
    this.readImageAsDataUrl(image)
      .then((result) => {
        this.imagePreview = result;
        this.uploadImage = true;
        this.imageInputClass = 'image-input image-input-empty image-input-outline image-input-placeholder mb-3';
        // Notifica a Angular para que actualice la vista
        this.cdr.detectChanges();
      })
      .catch((error) => {
        console.error('Error al leer la imagen:', error);
      });
  }

  readImageAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        resolve(event.target.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  deleteImage(){
    const image: Image = {
      name: this.imageName,
      path: this.options.pathImage,
      file: null
    }
    this.imageService.deleteImage(image).subscribe((response: any) => {
      console.log('Imagen eliminada exitosamente:', response);
      this.cambiarImagenDeFondo();
      // Notifica a Angular para que actualice la vista
      this.cdr.detectChanges();
    });
  }

  // Cambia el icono de "sin logo" según el tema elegido.
  cambiarImagenDeFondo() {
    if(this.options.imagePreview){
      this.imagePreview = this.options.imagePreview
    }else{
      const theme = localStorage.getItem('kt_theme_mode_value');
      this.imagePreview = 'assets/media/svg/files/';
      this.imagePreview = theme === 'light' ? this.imagePreview + 'blank-image.svg' :  this.imagePreview + 'blank-image-dark.svg';
    }
  }
}
