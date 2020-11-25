import { Pipe, PipeTransform } from '@angular/core';
import {UnidadeMedidaEnum} from '../../../item/model/unidadeMedidaEnum';

@Pipe({
  name: 'unidadeMedida'
})
export class UnidadeMedidaPipe implements PipeTransform {

  transform(value: UnidadeMedidaEnum): string {
    switch (value) {
      case UnidadeMedidaEnum.UNIDADE:
        return 'Unidade';
      case UnidadeMedidaEnum.QUILOGRAMA:
        return 'Quilograma';
      case UnidadeMedidaEnum.LITRO:
        return 'Litro';
      default:
        return 'Unidade de medida não encontrada';
    }
  }

}
