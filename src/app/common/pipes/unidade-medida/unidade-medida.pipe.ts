import {Pipe, PipeTransform} from '@angular/core';
import {UnidadeMedidaEnum} from '../../../item/model/unidade-medida.enum';
import {TipoPipeUnidadeMedidaEnum} from '../../models/tipo-pipe-unidade-medida.enum';

@Pipe({
  name: 'unidadeMedida'
})
export class UnidadeMedidaPipe implements PipeTransform {

  /**
   * @param unidadeMedidaEnum  A ser percorrida para transformação
   * @param tipoPipe  A ser percorrido para transformação
   * @returns String processada e transformada conforme unidadeMedidaEnum e tipoPipe
   */
  transform(unidadeMedidaEnum: UnidadeMedidaEnum, tipoPipe: TipoPipeUnidadeMedidaEnum): string {
    switch (unidadeMedidaEnum) {
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
