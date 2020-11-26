import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class MenuService {

  alteraSituacaoMenuEventEmitter = new EventEmitter();

  constructor() {
  }

  alteraSituacaoMenu() {
    this.alteraSituacaoMenuEventEmitter.emit();
  }
}
