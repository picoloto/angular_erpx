import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemListRoutingModule} from './item-list-routing.module';
import {ItemListComponent} from './item-list.component';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ItemService} from '../service/item.service';
import {CustomBreadcrumbModule} from '../../common/breadcrumb/customBreadcrumb.module';
import {PerecivelPipeModule} from '../../common/pipes/perecivel/perecivel.pipe.module';
import {RippleModule} from 'primeng/ripple';
import {UnidadeMedidaPipeModule} from '../../common/pipes/unidadeMedida/unidadeMedida.pipe.module';

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
  ],
  providers: [ItemService]
})
export class ItemListModule {
}
