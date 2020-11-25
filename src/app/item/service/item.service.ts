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

  saveItem(novoItem: Item): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!novoItem.id) {
          this.trataNovoItem(novoItem);
        } else {
          this.trataEdicaoItem(novoItem);
        }

        resolve();
      }, 2000);
    });
  }

  private trataNovoItem(novoItem: Item) {
    const itens = JSON.parse(localStorage.getItem('itens'));
    novoItem.id = itens?.length > 0 ? Math.max.apply(null, itens.map(i => i.id)) + 1 : 1;
    itens.push(novoItem);
    localStorage.removeItem('itens');
    localStorage.setItem('itens', JSON.stringify(itens));
  }

  private trataEdicaoItem(novoItem: Item) {

  }
}
