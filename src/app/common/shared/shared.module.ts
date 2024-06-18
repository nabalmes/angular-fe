import { NgModule } from '@angular/core';
import { Ng2FlatpickrCustomDirective } from '../ui/directives/ng2-flatpickr-custom.directive';
import { AgeValidatorDirective } from '../ui/directives/age-validator.directive';
import { FileSizeValidatorDirective } from '../ui/directives/file-size.directive';



@NgModule({
  declarations: [
    Ng2FlatpickrCustomDirective,
    AgeValidatorDirective,
    FileSizeValidatorDirective
  ],
  imports: [
   
  ],
  exports: [
    Ng2FlatpickrCustomDirective,
    AgeValidatorDirective,
    FileSizeValidatorDirective
  ]
})
export class SharedModule { }