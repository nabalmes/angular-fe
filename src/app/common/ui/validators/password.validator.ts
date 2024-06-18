import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static strong(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let isLengthOk = control.value && control.value.length >= 8;

        if (!isLengthOk ||
            !hasNumber ||
            !hasUpper ||
            !hasLower) {
                return {
                    characterLength: !isLengthOk,
                    number: !hasNumber,
                    upperCase: !hasUpper,
                    lowerCase: !hasLower
                };
        };

        // // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        // const valid = hasNumber && hasUpper && hasLower;
        // if (!valid) {
        //     // return what´s not valid
        //     return { strong: true };
        // }
        return null;
    }
}