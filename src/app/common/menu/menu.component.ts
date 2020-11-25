import {Component, HostListener, OnInit} from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.menuVisivel = event.target.innerWidth >= 768;
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
      boxShadow: 'rgba(0, 0, 0, 0.10) 0px 2px 6px, rgba(0, 0, 0, 0.10) 0px 2px 6px',
    };
    this.menuVisivel = window.innerWidth >= 768;
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
