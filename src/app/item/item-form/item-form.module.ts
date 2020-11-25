import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemFormRoutingModule } from './item-form-routing.module';
import { ItemFormComponent } from './item-form.component';
import {CustomBreadcrumbModule} from '../../common/breadcrumb/customBreadcrumb.module';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [ItemFormComponent],
  imports: [
    CommonModule,
    ItemFormRoutingModule,
    CustomBreadcrumbModule,
    CardModule
  ]
})
export class ItemFormModule { }
