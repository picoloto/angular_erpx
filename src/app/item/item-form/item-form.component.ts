import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {UnidadeMedidaEnum} from '../model/unidade-medida.enum';
import {UnidadeMedidaPipe} from '../../common/pipes/unidade-medida/unidade-medida.pipe';
import {TipoPipeUnidadeMedidaEnum} from '../../common/models/tipo-pipe-unidade-medida.enum';
import {FormUtils} from '../../common/utils/form-utils';
import {ObjectUtils} from '../../common/utils/object-utils';
import {Item} from '../model/item';
import {ItemService} from '../service/item.service';
import {ValidatorUtils} from '../../common/utils/validator-utils';
import {ConfirmationUtils} from '../../common/utils/confirmation-utils';
import {PtbrUtils} from '../../common/utils/ptbr-utils';
import {MessageUtils} from '../../common/utils/message-utils';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  itemForm: FormGroup;
  item = new Item();

  currencyPtBr = PtbrUtils.getCurrencyOptions();
  datePtBr = PtbrUtils.getTraducaoData();
  tipoPipeUnidadeMedidaEnum = TipoPipeUnidadeMedidaEnum;
  unidadeMedidaList: SelectItem[];

  quantidadeMask: string;
  dataAtual = new Date();
  vencido = false;
  dataMaximaFabricacao: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private unidadeMedidaPipe: UnidadeMedidaPipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private itemService: ItemService,
  ) {
    this.dataAtual.setHours(0, 0, 0, 0);
    this.montaFormGroup();
    this.montaListaUnidadeMedida();
    this.changeUnidadeMedida();
  }

  ngOnInit() {
    const idItem = this.route.snapshot.paramMap.get('id');
    if (!!idItem) {
      this.itemForm.disable();
      this.getItemById(Number(idItem));
    }
  }

  onSalvarClick() {
    if (this.itemForm.valid) {
      this.itemForm.disable();
      const objectItem = ObjectUtils.objectFromForm(this.itemForm, this.item);

      this.itemService.saveItem(objectItem)
        .subscribe(r => {
          this.itemForm.enable();
          this.itemForm.reset();
          FormUtils.formFromObject(this.itemForm, this.item);

          this.messageService.add(MessageUtils.getMensagemSucessoPadrao('Item salvo com sucesso'));
          this.router.navigate(['/item', this.item.id]);
        });
    } else {
      FormUtils.markAsDirtyAllControls(this.itemForm);
      this.messageService.add(
        MessageUtils.getMensagemAvisoPadrao('Existem inconsistências  no seu cadastro.\nPor gentileza, verifique os campos destacados')
      );
    }
  }

  changeUnidadeMedida() {
    this.quantidadeMask = this.unidadeMedidaPipe.transform(this.itemForm.controls.unidadeMedida.value, TipoPipeUnidadeMedidaEnum.MASK);
  }

  changePerecivel() {
    const dataValidadeFormControl = this.itemForm.controls.dataValidade;
    if (!!this.itemForm.controls.perecivel.value) {
      dataValidadeFormControl.setValidators([ValidatorUtils.validatorRequired]);
    } else {
      dataValidadeFormControl.clearValidators();
    }
    dataValidadeFormControl.updateValueAndValidity();
  }

  selectDataValidade() {
    this.trataVencimento();
    this.trataDataFabricacao();
  }

  onCancelarClick() {
    if (!this.itemForm.pristine) {
      this.confirmationService.confirm(
        ConfirmationUtils.getConfirmacaoPadrao(
          'Você realmente deseja cancelar?\n Esta ação não poderá ser desfeita',
          () => this.router.navigate(['/lista-itens'])
        ));
    } else {
      this.router.navigate(['/lista-itens']);
    }
  }

  private montaFormGroup() {
    this.itemForm = this.formBuilder.group({
      nome: [null, [ValidatorUtils.validatorRequired, ValidatorUtils.validatorMaxLength(50)]],
      unidadeMedida: [UnidadeMedidaEnum.LITRO, ValidatorUtils.validatorRequired],
      quantidade: [null],
      preco: [null, ValidatorUtils.validatorRequired],
      perecivel: [false],
      dataValidade: [null],
      dataFabricacao: [null, ValidatorUtils.validatorRequired],
    });
  }

  private montaListaUnidadeMedida() {
    this.unidadeMedidaList = [
      {
        label: this.unidadeMedidaPipe.transform(UnidadeMedidaEnum.LITRO, TipoPipeUnidadeMedidaEnum.DESCRICAO),
        value: UnidadeMedidaEnum.LITRO
      },
      {
        label: this.unidadeMedidaPipe.transform(UnidadeMedidaEnum.QUILOGRAMA, TipoPipeUnidadeMedidaEnum.DESCRICAO),
        value: UnidadeMedidaEnum.QUILOGRAMA
      },
      {
        label: this.unidadeMedidaPipe.transform(UnidadeMedidaEnum.UNIDADE, TipoPipeUnidadeMedidaEnum.DESCRICAO),
        value: UnidadeMedidaEnum.UNIDADE
      },
    ];
  }

  private trataVencimento() {
    const dataValidadeFormControl = this.itemForm.controls.dataValidade;

    if (!!dataValidadeFormControl.value) {
      this.vencido = dataValidadeFormControl.value < this.dataAtual;
      this.dataMaximaFabricacao = dataValidadeFormControl.value;
    } else {
      this.vencido = false;
      this.dataMaximaFabricacao = null;
    }
  }

  private trataDataFabricacao() {
    const dataValidadeFormControl = this.itemForm.controls.dataValidade;
    const dataFabricacaoFormControl = this.itemForm.controls.dataFabricacao;

    if (!!dataValidadeFormControl.value && dataValidadeFormControl.value < dataFabricacaoFormControl.value) {
      this.itemForm.controls.dataFabricacao.setValue(null);
      this.messageService.add(
        MessageUtils.getMensagemAvisoPadrao(`O campo Data de Fabricação foi limpo.
        \nÉ necessário informar uma data igual ou inferior a Data de Validade.`)
      );
    }
  }

  /**
   * @param idItem  Id do Item a ser buscado
   */
  private getItemById(idItem: number) {
    this.itemService.getItemById(idItem)
      .subscribe(r => {
        this.item = ObjectUtils.clone(r);
        this.itemForm.enable();
        FormUtils.formFromObject(this.itemForm, this.item);
        this.changeUnidadeMedida();
        this.changePerecivel();
        this.selectDataValidade();
      }, error => {
        console.log(error);
        this.messageService.add(MessageUtils.getMensagemErroPadrao(error));
        this.router.navigate(['/lista-itens']);
      });
  }
}
