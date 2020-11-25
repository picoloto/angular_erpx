import {Pipe, PipeTransform} from '@angular/core';
import {UnidadeMedidaEnum} from '../../../item/model/unidadeMedidaEnum';
import {TipoPipeUnidadeMedidaEnum} from '../../models/tipoPipeUnidadeMedidaEnum';

@Pipe({
  name: 'unidadeMedida'
})
export class UnidadeMedidaPipe implements PipeTransform {

  transform(value: UnidadeMedidaEnum, tipoPipe: TipoPipeUnidadeMedidaEnum): string {
    switch (value) {
      case UnidadeMedidaEnum.UNIDADE:
        switch (tipoPipe) {
          case TipoPipeUnidadeMedidaEnum.DESCRICAO:
            return 'Unidade';
          case TipoPipeUnidadeMedidaEnum.SIGLA:
            return 'UN';
          case TipoPipeUnidadeMedidaEnum.MASK:
            return '0*';
        }
        break;
      case UnidadeMedidaEnum.QUILOGRAMA:
        switch (tipoPipe) {
          case TipoPipeUnidadeMedidaEnum.DESCRICAO:
            return 'Quilograma';
          case TipoPipeUnidadeMedidaEnum.SIGLA:
            return 'KG';
          case TipoPipeUnidadeMedidaEnum.MASK:
            return '0*,000';
        }
        break;
      case UnidadeMedidaEnum.LITRO:
        switch (tipoPipe) {
          case TipoPipeUnidadeMedidaEnum.DESCRICAO:
            return 'Litro';
          case TipoPipeUnidadeMedidaEnum.SIGLA:
            return 'LT';
          case TipoPipeUnidadeMedidaEnum.MASK:
            return '0*,000';
          default:
        }
        break;
      default:
        return 'Unidade de medida não encontrada';
    }
  }

}
