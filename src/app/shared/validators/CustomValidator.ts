import { AbstractControl } from '@angular/forms';


export class CustomeValidator {

  // Domain Check Validator
  static emailDomainCheck(domainName: string) {
    // tslint:disable-next-line: no-unused-expression
    return (control: AbstractControl): { [key: string]: any } => {
      const email: string = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
        return null;
      } else {
        return { 'emailDomain': true };
      }
    };
  }

  // No White Space check custom Validator
  static noWhitespaceValidator(control: AbstractControl) {
    if (control.value === '') {
      return null;
    }

    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
