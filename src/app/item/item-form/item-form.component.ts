import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {UnidadeMedidaEnum} from '../model/unidade-medida.enum';
import {UnidadeMedidaPipe} from '../../common/pipes/unidade-medida/unidade-medida.pipe';
import {TipoPipeUnidadeMedidaEnum} from '../../common/models/tipo-pipe-unidade-medida.enum';
import {CurrencyPtbr} from '../../common/models/currency-ptbr';
import {DatePtbr} from '../../common/models/date-ptbr';
import {CustomConfirmation} from '../../common/models/custom-confirmation';
import {FormUtils} from '../../common/utils/form-utils';
import {ObjectUtils} from '../../common/utils/object-utils';
import {Item} from '../model/item';
import {ItemService} from '../service/item.service';
import {ValidatorUtils} from '../../common/utils/validator-utils';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  tipoPipeUnidadeMedidaEnum = TipoPipeUnidadeMedidaEnum;
  unidadeMedidaList: SelectItem[];
  quantidadeMask: string;
  itemForm: FormGroup;
  currencyPtBr = new CurrencyPtbr();
  datePtBr = new DatePtbr();
  dataAtual = new Date();
  vencido = false;
  dataMaximaFabricacao: Date;
  item = new Item();

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
      this.buscarItem(Number(idItem));
    }
  }

  onSalvarClick() {
    if (this.itemForm.valid) {
      this.itemForm.disable();
      const objectItem = ObjectUtils.objectFromForm(this.itemForm, this.item);

      this.itemService.saveItem(objectItem).then(r => {
        this.itemForm.enable();
        this.itemForm.reset();
        FormUtils.formFromObject(this.itemForm, this.item);
        if (!this.itemForm.controls.unidadeMedida.value) {
          this.itemForm.controls.unidadeMedida.setValue(UnidadeMedidaEnum.LITRO);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Item salvo com sucesso',
          life: 4000
        });
        this.router.navigate(['/item', this.item.id]);
      });
    } else {
      FormUtils.markAsDirtyAllControls(this.itemForm);
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Existem inconsistências  no seu cadastro.\nPor gentileza, verifique os campos destacados',
        life: 4000
      });
    }
  }

  changeUnidadeMedida() {
    this.itemForm.controls.quantidade.setValue(null);
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
      const customConfirmation = new CustomConfirmation(
        'Você realmente deseja cancelar?\n Esta ação não poderá ser desfeita',
        () => this.router.navigate(['/lista-itens'])
      );
      this.confirmationService.confirm(customConfirmation);
    } else {
      this.router.navigate(['/lista-itens']);
    }
  }

  private montaFormGroup() {
    this.itemForm = this.formBuilder.group({
      nome: [null, ValidatorUtils.validatorRequired],
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
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Data de Fabricação foi limpo.\nÉ necessário informar uma data igual ou inferior a Data de Validade.',
        life: 4000
      });
    }
  }

  private buscarItem(idItem: number) {
    this.itemService.getItemById(idItem).then(r => {
      this.item = ObjectUtils.clone(r);
      this.itemForm.enable();
      FormUtils.formFromObject(this.itemForm, this.item);
    });
  }
}
