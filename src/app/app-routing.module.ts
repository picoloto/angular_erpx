import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'lista-itens',
    loadChildren: () => import('./item/item-list/item-list.module').then(m => m.ItemListModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item-form/item-form.module').then(m => m.ItemFormModule)
  },
  {
    path: 'item/:id',
    loadChildren: () => import('./item/item-form/item-form.module').then(m => m.ItemFormModule)
  },
  {
    path: '**',
    redirectTo: '/lista-itens', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
