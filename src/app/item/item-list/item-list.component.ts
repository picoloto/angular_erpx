import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Item} from '../model/item';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ItemService} from '../service/item.service';
import {TipoPipeUnidadeMedidaEnum} from '../../common/models/tipo-pipe-unidade-medida.enum';
import {Subscription} from 'rxjs';
import {MessageUtils} from '../../common/utils/message-utils';
import {ConfirmationUtils} from '../../common/utils/confirmation-utils';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements AfterViewInit, OnDestroy {
  itens: Item[] = [];
  loading;
  tipoPipeUnidadeMedidaEnum = TipoPipeUnidadeMedidaEnum;
  getItens$ = new Subscription();
  setItens$ = new Subscription();

  constructor(private cdr: ChangeDetectorRef,
              private itemService: ItemService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngAfterViewInit() {
    this.loading = true;
    this.cdr.detectChanges();
  }

  onLazyLoad(): void {
    this.getItens$ = this.itemService.getListaDeItens()
      .subscribe(itensResult => {
        this.itens = [...itensResult];
        setTimeout(() => {
          this.loading = false;
        });
      }, error => {
        this.messageService.add(MessageUtils.getMensagemErroPadrao(error));
        this.loading = false;
      });
  }

  /**
   * @param item  Item a ser removido
   */
  removeItemClick(item: Item) {
    this.confirmationService.confirm(ConfirmationUtils.getConfirmacaoPadrao(
      'Você realmente deseja excluir esse item?\n Esta ação não poderá ser desfeita',
      () => this.removeItem(item)
    ));
  }

  ngOnDestroy() {
    this.getItens$.unsubscribe();
    this.setItens$.unsubscribe();
  }

  /**
   * @param item  Item a ser removido
   */
  private removeItem(item: Item) {
    this.loading = true;
    const novosItens = this.itens.filter(i => i.id !== item.id);
    this.setItens$ = this.itemService.setListaDeItens(novosItens)
      .subscribe(() => {
        this.itens = novosItens;
        this.messageService.add(MessageUtils.getMensagemSucessoPadrao('Item excluído com sucesso'));
        this.loading = false;
      }, error => {
        this.messageService.add(MessageUtils.getMensagemErroPadrao(error));
        this.onLazyLoad();
        this.loading = false;
      });
  }
}
