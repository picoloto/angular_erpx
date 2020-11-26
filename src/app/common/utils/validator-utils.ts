import {FormControl, ValidationErrors} from '@angular/forms';

export class ValidatorUtils {
  static validatorRequired(fc: FormControl): ValidationErrors {
    const isInvalid = !fc.value;
    return isInvalid ? {error: 'Campo obrigatório'} : null;
  }
}
