import {Injectable} from '@angular/core';
import {Item} from '../model/item';
import {Observable} from 'rxjs';

@Injectable()
export class ItemService {
  private listaDeItensDoLocalStorage: Item[] = [];

  constructor() {
  }

  /**
   * @returns Lista de itens encontrados no LocalStorage
   */
  getListaDeItens(): Observable<Item[]> {
    return new Observable(observer => {
      setTimeout(() => {
        this.buscaItensNoLocalStorage();
        observer.next(this.listaDeItensDoLocalStorage);
      }, 1500);
    });
  }

  /**
   * @param itens  Lista de itens a ser alterados
   * @returns Observable<boolean> após realizar o processo
   */
  setListaDeItens(itens: Item[]): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        this.atualizaItensNoLocalStorage(itens);
        observer.next(true);
      }, 1500);
    });
  }

  /**
   * @param novoItem  Item a ser alterado
   * @returns Observable<boolean> após realizar o processo
   */
  saveItem(novoItem: Item): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        this.buscaItensNoLocalStorage();
        if (!novoItem.id) {
          const idItemMap = this.listaDeItensDoLocalStorage.map(i => i.id);
          novoItem.id = idItemMap.length > 0 ? idItemMap.reduce((p) => p + 1) + 1 : 1;
        } else {
          this.listaDeItensDoLocalStorage = this.listaDeItensDoLocalStorage.filter(r => r.id !== novoItem.id);
        }
        this.listaDeItensDoLocalStorage.push(novoItem);
        this.atualizaItensNoLocalStorage(this.listaDeItensDoLocalStorage);
        observer.next(true);
      }, 1500);
    });
  }

  /**
   * @param id  Id do Item a ser alterado
   * @returns Observable<Item> após realizar o processo
   */
  getItemById(id: number): Observable<Item> {
    return new Observable(observer => {
      setTimeout(() => {
        const itens = JSON.parse(localStorage.getItem('itens'));
        const item = itens.find(i => i.id === id);
        if (!!item) {
          observer.next(item);
        } else {
          observer.error(`O item de ID ${id} não existe!`);
        }
      }, 1500);
    });
  }

  private buscaItensNoLocalStorage() {
    this.listaDeItensDoLocalStorage = JSON.parse(localStorage.getItem('itens'));
  }

  /**
   * @param itens  Lista de itens a ser armazenados no LocalStorage
   */
  private atualizaItensNoLocalStorage(itens: Item[]) {
    localStorage.removeItem('itens');
    localStorage.setItem('itens', JSON.stringify(itens));
  }
}
