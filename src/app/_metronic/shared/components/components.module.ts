import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image.component';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TagComponent } from './tag/tag.component';
import { TagifyModule } from 'ngx-tagify';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMultiImageComponent } from './upload-multi-image/upload-multi-image.component';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { InfoMessageComponent } from './info-message/info-message.component';
import { ColoredCircleComponent } from './colored-circle/colored-circle.component';
import { SharedModule } from '../shared.module';
import { DynamicSearchFormComponent } from './dynamic-search-form/dynamic-search-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };

@NgModule({
  declarations: [
    LoaderComponent,
    UploadSingleImageComponent,
    UploadMultiImageComponent,
    TabComponent,
    TabGroupComponent,
    TagComponent,
    InfoMessageComponent,
    ColoredCircleComponent,
    DynamicSearchFormComponent,
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    SharedModule,
    TagifyModule,
    FormsModule,
    ReactiveFormsModule,
    DropzoneModule,
    NgbModule,
    NgSelectModule
  ],
  exports: [
    LoaderComponent,
    UploadSingleImageComponent,
    UploadMultiImageComponent,
    TabComponent,
    TabGroupComponent,
    TagComponent,
    InfoMessageComponent,
    ColoredCircleComponent,
    DynamicSearchFormComponent,
    DynamicTableComponent
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ComponentsModule { }
