import {FormGroup} from '@angular/forms';

export class FormUtils {

  static markAsDirtyAllControls(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsDirty();
    });
  }
}
