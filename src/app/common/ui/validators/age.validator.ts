import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class AgeValidator {

    public static legal(control: FormControl): ValidationResult {

        const birthdate = control.value && control.value.length > 0 ? control.value[0] : control.value;
        let timeDiff = Math.abs(Date.now() - Date.parse(birthdate));
        let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

        if (age < 18) {
            return {legalAge: true};
        }

        return null;
    }
}