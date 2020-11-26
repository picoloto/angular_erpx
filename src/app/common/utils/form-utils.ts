import {FormGroup} from '@angular/forms';

export class FormUtils {

  static markAsDirtyAllControls(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsDirty();
    });
  }

  static formFromObject(form: FormGroup, object: any): void {
    Object.keys(object).forEach(key => {
      if (key.includes('data')) {
        const newDate = new Date(object[key]);
        newDate.setHours(0, 0, 0, 0);
        form.controls[key].setValue(newDate);
      } else if (key !== 'id') {
        form.controls[key].setValue(object[key]);
      }
    });
  }
}
