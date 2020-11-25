import {FormGroup} from '@angular/forms';

export class ObjectUtils {

  static objectFromForm(form: FormGroup, object: any): any {
    Object.keys(form.controls).forEach(key => {
      object[key] = form.controls[key].value;
    });
    return object;
  }
}
