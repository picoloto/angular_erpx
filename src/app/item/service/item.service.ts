import {Injectable} from '@angular/core';
import {Item} from '../model/item';

@Injectable()
export class ItemService {

  constructor() {
  }

  // TODO verificar isso
  // Todos esses metodos podem ser substituidos por Observables

  getItens(): Promise<Item[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(localStorage.getItem('itens')));
      }, 2000);
    });
  }

  setItens(itens: Item[]): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.removeItem('itens');
        localStorage.setItem('itens', JSON.stringify(itens));
        resolve();
      }, 2000);
    });
  }
}
