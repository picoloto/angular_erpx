import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemFormRoutingModule} from './item-form-routing.module';
import {ItemFormComponent} from './item-form.component';
import {CustomBreadcrumbModule} from '../../common/components/custom-breadcrumb/custom-breadcrumb.module';
import {CardModule} from 'primeng/card';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {UnidadeMedidaPipeModule} from '../../common/pipes/unidade-medida/unidade-medida.pipe.module';
import {NgxMaskModule} from 'ngx-mask';
import {UnidadeMedidaPipe} from '../../common/pipes/unidade-medida/unidade-medida.pipe';
import {NgxCurrencyModule} from 'ngx-currency';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {ActionBarModule} from '../../common/components/action-bar/action-bar.module';
import {ItemService} from '../service/item.service';
import {ProgressBarModule} from 'primeng/progressbar';
import {CustomProgressBarModule} from '../../common/components/custom-progress-bar/custom-progress-bar.module';
import {InputContainerModule} from '../../common/components/input-container/input-container.module';
import {CheckDateValidityDirectiveModule} from '../../common/directives/check-date-validity.directive.module';

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
    InputContainerModule,
    CheckDateValidityDirectiveModule,
  ]
})
export class ItemFormModule {
}
