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
        const itens = JSON.parse(localStorage.getItem('itens'));
        if (!novoItem.id) {
          this.trataNovoItem(novoItem, itens);
        } else {
          this.trataEdicaoItem(novoItem, itens);
        }

        resolve();
      }, 2000);
    });
  }

  getItemById(id: number): Promise<Item> {
    return new Promise(resolve => {
      setTimeout(() => {
        const itens = JSON.parse(localStorage.getItem('itens'));
        const item = itens.find(i => i.id === id);
        if (!!item) {
          resolve(item);
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }

  private trataNovoItem(novoItem: Item, itens: Item[]) {
    novoItem.id = itens?.length > 0 ? Math.max.apply(null, itens.map(i => i.id)) + 1 : 1;
    itens.push(novoItem);
    localStorage.removeItem('itens');
    localStorage.setItem('itens', JSON.stringify(itens));
  }

  private trataEdicaoItem(novoItem: Item, itens: Item[]) {
    itens = itens.filter(r => r.id !== novoItem.id);
    itens.push(novoItem);
    localStorage.removeItem('itens');
    localStorage.setItem('itens', JSON.stringify(itens));
  }

  // getCountries() {
  //   return this.http.get<any>('assets/countries.json')
  //     .toPromise()
  //     .then(res => <any[]>res.data)
  //     .then(data => { return data; });
  // }
}
