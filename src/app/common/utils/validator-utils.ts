import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class ValidatorUtils {

  /**
   * @param formControl  FormControl a ser validado
   * @returns ValidationErrors com a validação
   */
  static validatorRequired(formControl: FormControl): ValidationErrors {
    return !formControl.value ? {error: 'Campo obrigatório'} : null;
  }

  /**
   * @param length  Length a ser validado
   * @returns ValidatorFn com a validação
   */
  static validatorMaxLength(length: number): ValidatorFn {
    return (abstractControl: AbstractControl): { [key: string]: any } | null => {
      const isInvalid = abstractControl.value?.length > length;
      return isInvalid ? {error: `Tamanho máximo de ${length} caracteres`} : null;
    };
  }
}
