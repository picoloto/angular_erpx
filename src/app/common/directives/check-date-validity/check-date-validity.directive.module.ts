import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckDateValidityDirective} from './check-date-validity.directive';

@NgModule({
  declarations: [CheckDateValidityDirective],
  imports: [
    CommonModule,
  ],
  exports: [CheckDateValidityDirective],
  providers: []
})
export class CheckDateValidityDirectiveModule {
}
