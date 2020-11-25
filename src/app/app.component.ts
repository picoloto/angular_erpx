import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Item} from './item/model/item';
import {UnidadeMedidaEnum} from './item/model/unidadeMedidaEnum';
import {ItemService} from './item/service/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private primengConfig: PrimeNGConfig, private itemService: ItemService) {
    this.primengConfig.ripple = true;
    this.itemService.setItens(this.criaItens());
  }

  private criaItens(): Item[] {
    return [
      {
        id: 1,
        nome: 'Teste',
        unidadeMedida: UnidadeMedidaEnum.LITRO,
        quantidade: 10,
        preco: 15,
        perecivel: false,
        dataValidade: new Date(),
        dataFabricacao: new Date(),
      },
      {
        id: 2,
        nome: 'Teste 2',
        unidadeMedida: UnidadeMedidaEnum.QUILOGRAMA,
        quantidade: 12,
        preco: 22,
        perecivel: false,
        dataValidade: new Date(),
        dataFabricacao: new Date(),
      },
      {
        id: 3,
        nome: 'Teste 3',
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
        quantidade: 6,
        preco: 11,
        perecivel: true,
        dataValidade: new Date(),
        dataFabricacao: new Date(),
      }
    ];
  }
}
