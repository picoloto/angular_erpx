import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemFormRoutingModule} from './item-form-routing.module';
import {ItemFormComponent} from './item-form.component';
import {CustomBreadcrumbModule} from '../../common/breadcrumb/customBreadcrumb.module';
import {CardModule} from 'primeng/card';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {UnidadeMedidaPipeModule} from '../../common/pipes/unidadeMedida/unidadeMedida.pipe.module';
import {NgxMaskModule} from 'ngx-mask';
import {UnidadeMedidaPipe} from '../../common/pipes/unidadeMedida/unidadeMedida.pipe';
import {NgxCurrencyModule} from 'ngx-currency';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {ActionBarModule} from '../../common/actionBar/actionBar.module';
import {ItemService} from '../service/item.service';
import {ProgressBarModule} from 'primeng/progressbar';
import {CustomProgressBarModule} from '../../common/customProgressBar/customProgressBar.module';

@NgModule({
  declarations: [ItemFormComponent],
  providers: [UnidadeMedidaPipe, ItemService],
  imports: [
    CommonModule,
    ItemFormRoutingModule,
    CustomBreadcrumbModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    UnidadeMedidaPipeModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
    CheckboxModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    ActionBarModule,
    ProgressBarModule,
    CustomProgressBarModule,
  ]
})
export class ItemFormModule {
}
