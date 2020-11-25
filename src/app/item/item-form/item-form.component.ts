import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {UnidadeMedidaEnum} from '../model/unidadeMedidaEnum';
import {UnidadeMedidaPipe} from '../../common/pipes/unidadeMedida/unidadeMedida.pipe';
import {TipoPipeUnidadeMedidaEnum} from '../../common/models/tipoPipeUnidadeMedidaEnum';
import {CurrencyPtBr} from '../../common/models/currencyPtBr';
import {DatePtBr} from '../../common/models/datePtBr';
import {CustomConfirmation} from '../../common/models/customConfirmation';
import {FormUtils} from '../../common/utils/formUtils';
import {ObjectUtils} from '../../common/utils/objectUtils';
import {Item} from '../model/item';
import {ItemService} from '../service/item.service';

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
  currencyPtBr = new CurrencyPtBr();
  datePtBr = new DatePtBr();
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
    if (this.route.snapshot.paramMap.get('id')) {
      // TODO Editar aqui
    }
  }

  onSalvarClick() {
    if (this.itemForm.valid) {
      this.itemForm.disable();
      console.log(this.itemForm.value);
      const objectItem = ObjectUtils.objectFromForm(this.itemForm, new Item());
      console.log('objectItem', objectItem);
      this.itemService.saveItem(objectItem).then(r => {
        this.itemForm.enable();
        this.itemForm.reset();
        this.itemForm.controls.unidadeMedida.setValue(UnidadeMedidaEnum.LITRO);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Item salvo com sucesso',
          life: 4000
        });
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

  updateProfile() {
    this.itemForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  changeUnidadeMedida() {
    this.itemForm.controls.quantidade.setValue(null);
    this.quantidadeMask = this.unidadeMedidaPipe.transform(this.itemForm.controls.unidadeMedida.value, TipoPipeUnidadeMedidaEnum.MASK);
  }

  changePerecivel() {
    const dataValidadeFormControl = this.itemForm.controls.dataValidade;
    if (!!this.itemForm.controls.perecivel.value) {
      dataValidadeFormControl.setValidators([Validators.required]);
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
      nome: [null, Validators.required],
      unidadeMedida: [UnidadeMedidaEnum.LITRO, Validators.required],
      quantidade: [null],
      preco: [null, Validators.required],
      perecivel: [false],
      dataValidade: [null],
      dataFabricacao: [null, Validators.required],
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
}
