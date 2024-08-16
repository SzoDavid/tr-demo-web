import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class PasswordValidator {
    static password(control: AbstractControl): ValidationErrors | null {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(control.value) ? null : {invalidPassword: true};
    }

    static matchPassword(controlName: string, matchingControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);

            if (!control || !matchingControl) {
                return null;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            } else {
                matchingControl.setErrors(null);
                return null;
            }
        };
    }
}
