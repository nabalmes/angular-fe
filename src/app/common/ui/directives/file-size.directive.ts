import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ControlValueAccessor, FormControl, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[appFileSizeValidator]',
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FileSizeValidatorDirective),
        multi: true
    },
    {
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => FileSizeValidatorDirective),
        multi: true
    }
  ]
})

export class FileSizeValidatorDirective implements ControlValueAccessor, AsyncValidator   {
    onChange;
    validator: AsyncValidatorFn ;
  
    @HostListener('change', ['$event.target.files']) _handleInput(event) {
      this.onChange(event);
    }
  
    constructor(private element: ElementRef, private render: Renderer2) { 
        this.validator = this.generateValidtor();
    }

    formatBytes(bytes) {
        return  bytes / (1024 ** 2);
    }

    generateValidtor(): AsyncValidatorFn  {
        return (c: FormControl): Observable<ValidationErrors> => {
            const errors: ValidationErrors = {};

            if (c.value && c.value.length > 0) {
               const size = this.formatBytes(c.value[0].size); //MB

               let valToLower = null;
               if (c.value[0].name) {
                valToLower = c.value[0].name.toLowerCase();
               }
                
                let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); //add or remove required extensions here
                let regexTest = regex.test(valToLower);

                if (size > 3) {
                    errors['fileSize'] = true;
                } else if (c.value[0].name && !regexTest) {
                    errors['fileType'] = true;
                }
            }
            
            return of(errors);
        };
    }
  
    writeValue(value: any) {
      this.render.setProperty(this.element.nativeElement, 'value', null);
    }

    validate(c: AbstractControl): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
        return this.validator(c);
    }
    
    setDisabledState(isDisabled: boolean): void {
        this.render.setProperty(this.element.nativeElement, 'disabled', isDisabled);
    }
  
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = this.onChangeGenerator(fn);
    }
  
    registerOnTouched(fn: any) {  }
  
    nOnDestroy() {  }

    private onChangeGenerator(fn: (_: any) => {}): (_: any[]) => void {
        return (files: any[]) => {
            const fileArr: File[] = [];

            for (const f of files) {
                f.errors = {};
                fileArr.push(f);
            }
            fn(fileArr);
        };
    }
  }