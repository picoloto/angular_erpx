import {Directive, HostBinding, Self} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appCheckDateValidity]'
})
export class CheckDateValidityDirective {

  constructor(@Self() private formControl: NgControl) {
  }

  @HostBinding('class.invalid')
  public get isInvalid(): boolean {
    return this.invalid;
  }

  public get invalid(): boolean {
    return !this.formControl.valid && !this.formControl.pristine && !!this.formControl.errors;
  }

}
