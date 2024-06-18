import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { AgeValidator } from '../validators/age.validator';

@Directive({
  selector: '[appAgeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AgeValidatorDirective, multi: true }]
})
export class AgeValidatorDirective implements Validator {

  validate(control: FormControl): { [key: string]: any } | null {
    const birthdate = control.value
    let timeDiff = Math.abs(Date.now() - Date.parse(birthdate));
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

    if (age < 18) {
        return {legalAge: true};
    }

    return null;
  }
}
