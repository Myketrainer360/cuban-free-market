import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLengthValid = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;

      return !passwordValid ? { strongPassword: true } : null;
    };
  }

  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      // Cuban phone number format: +53 XXXXXXXX
      const phoneRegex = /^(\+53)?[0-9]{8}$/;
      return phoneRegex.test(value) ? null : { phoneNumber: true };
    };
  }

  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isWhitespace = (value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }

  static matchPassword(passwordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get(passwordField)?.value;
      const confirmPassword = control.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
