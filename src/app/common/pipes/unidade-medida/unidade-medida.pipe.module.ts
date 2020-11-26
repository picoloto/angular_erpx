import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UnidadeMedidaPipe} from './unidade-medida.pipe';

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
