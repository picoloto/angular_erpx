import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UnidadeMedidaPipe} from './unidadeMedida.pipe';

@NgModule({
  declarations: [UnidadeMedidaPipe],
  imports: [
    CommonModule,
  ],
  exports: [UnidadeMedidaPipe],
  providers: []
})
export class UnidadeMedidaPipeModule {
}
