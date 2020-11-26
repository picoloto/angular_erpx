import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemListRoutingModule} from './item-list-routing.module';
import {ItemListComponent} from './item-list.component';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ItemService} from '../service/item.service';
import {CustomBreadcrumbModule} from '../../common/components/custom-breadcrumb/custom-breadcrumb.module';
import {PerecivelPipeModule} from '../../common/pipes/perecivel/perecivel.pipe.module';
import {RippleModule} from 'primeng/ripple';
import {UnidadeMedidaPipeModule} from '../../common/pipes/unidade-medida/unidade-medida.pipe.module';
import {ActionBarModule} from '../../common/components/action-bar/action-bar.module';
import {ProgressBarModule} from 'primeng/progressbar';
import {CustomProgressBarModule} from '../../common/components/custom-progress-bar/custom-progress-bar.module';
import {CustomProgressTextModule} from '../../common/components/custom-progress-text/custom-progress-text.module';
import {CampoVazioPipeModule} from '../../common/pipes/campo-vazio/campo-vazio.pipe.module';

@NgModule({
  declarations: [ItemListComponent],
  imports: [
    CommonModule,
    ItemListRoutingModule,
    CardModule,
    TableModule,
    ButtonModule,
    CustomBreadcrumbModule,
    PerecivelPipeModule,
    RippleModule,
    UnidadeMedidaPipeModule,
    ActionBarModule,
    ProgressBarModule,
    CustomProgressBarModule,
    CustomProgressTextModule,
    CampoVazioPipeModule,
  ],
  providers: [ItemService]
})
export class ItemListModule {
}
