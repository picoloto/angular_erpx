import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuStyle} from './menuStyle';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuVisivel = true;
  itensMenu: MenuItem[];
  menuStyle: MenuStyle;

  constructor() {
  }

  ngOnInit() {
    this.montaMenuStyle();
    this.montaItensMenu();
  }

  private montaMenuStyle() {
    this.menuStyle = {
      width: '11em',
      marginTop: '3em',
      padding: '0',
      boxShadow: '0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)'
    };
  }

  private montaItensMenu() {
    this.itensMenu = [
      {
        icon: 'pi pi-fw pi-plus',
        label: 'Novo item',
        routerLink: '/item',
      },
      {
        icon: 'pi pi-fw pi-list',
        label: 'Lista de itens',
        routerLink: '/lista-itens',
      },
    ];
  }
}
