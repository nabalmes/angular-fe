import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ApplicantService } from "app/api";
import { environment } from "environments/environment";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

export class UsernameValidator {
  static createValidator(applicantService: ApplicantService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value !== "") {
        return applicantService.apiVversionMembershipApplicantCheckAccountGet(environment.apiVersion, control.value, control.value).pipe(
          map(res => {
            return res.Failed ? { usernameExists: true } : null;
          }),
          catchError((err) => of({ usernameExists: true }))
        );
      } else {
        return null;
      }
    };


    // return (control: AbstractControl): Observable<ValidationErrors | null> => {
    //   if (!control.valueChanges) {
    //     return of(null);
    //   } else {
    //     return control.valueChanges.pipe(
    //       debounceTime(1000),
    //       distinctUntilChanged(),
    //       switchMap((value) =>  applicantService.apiVversionMembershipApplicantCheckAccountGet(environment.apiVersion, value, value)),
    //       map(res => {
    //         return res.Failed ? { usernameExists: true } : null;
    //       }),
    //       catchError((err) => of({ usernameExists: true }))
    //     )
    //   }
    // }
  }

  static usernameAnyValidator() {
    return (formGroup: FormGroup) => {
        const emailAddressCtrl = formGroup.controls["emailAddress"];
        const contactNumberCtrl = formGroup.controls["contactNumber"];
  
        // set error if validation fails
    if ((emailAddressCtrl.value !== '' && emailAddressCtrl.value !== null) || ( contactNumberCtrl.value != '' &&  contactNumberCtrl.value != null)) 
    {
      if (emailAddressCtrl.value) 
      {
        if (!Validators.email(emailAddressCtrl)) 
        {
          emailAddressCtrl.setErrors(null);
        } 
        else
        {
        emailAddressCtrl.setErrors({ email: true });        
        }
      }
      else 
      {
        emailAddressCtrl.setErrors(null);     
      } 

      if (contactNumberCtrl.value)
      {
        if (/^(?:\d{2}([-.])\d{3}\1\d{3}\1\d{3}|\d{11})$/.test(contactNumberCtrl.value))
        {
          contactNumberCtrl.setErrors(null);
        } 
        else 
        {
          contactNumberCtrl.setErrors({ invalid: true });
        }    
      } 
      else 
      {
        
        contactNumberCtrl.setErrors(null);     
      } 
    } 
    else 
    {
      emailAddressCtrl.setErrors({ atLeastOne: true });
      contactNumberCtrl.setErrors({ atLeastOne: true });
    }
    }
  }
}