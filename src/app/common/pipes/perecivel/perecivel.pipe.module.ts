import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PerecivelPipe} from './perecivel.pipe';

@NgModule({
  declarations: [PerecivelPipe],
  imports: [
    CommonModule,
  ],
  exports: [PerecivelPipe],
  providers: []
})
export class PerecivelPipeModule {
}
