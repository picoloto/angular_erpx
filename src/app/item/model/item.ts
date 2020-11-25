import {UnidadeMedidaEnum} from './unidadeMedidaEnum';

export class Item {
  id: number;
  nome: string;
  unidadeMedida: UnidadeMedidaEnum;
  quantidade: number;
  preco: number;
  perecivel: boolean;
  dataValidade: Date;
  dataFabricacao: Date;

  constructor() {
  }
}
