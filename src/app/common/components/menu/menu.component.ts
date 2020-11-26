import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuStyleInterface} from '../../models/menu-style.interface';
import {MenuService} from './menu.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  menuVisivel = true;
  mobile = false;
  itensMenu: MenuItem[];
  menuStyle: MenuStyleInterface;
  alteraSituacaoMenu$ = new Subscription();

  constructor(private menuService: MenuService, private router: Router) {
    this.alteraSituacaoMenu$ = this.menuService.alteraSituacaoMenuEventEmitter
      .subscribe(r => this.menuVisivel = !this.menuVisivel);
  }

  /**
   * @param event  Evento disparado conforme as alterações no tamanho da tela
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.menuVisivel = event.target.innerWidth >= 768;
    this.mobile = event.target.innerWidth < 768;
  }

  ngOnInit() {
    this.montaMenuStyle();
    this.montaItensMenu();
  }

  ngOnDestroy() {
    this.alteraSituacaoMenu$.unsubscribe();
  }

  /**
   * @param routerLink  Valor resgatado do clique no item do menu utilizado para navegação
   */
  itemMenuClick(routerLink: any) {
    this.router.navigate([routerLink]);
    if (!!this.mobile) {
      this.menuVisivel = false;
    }
  }

  private montaMenuStyle() {
    this.menuStyle = {
      width: '11em',
      marginTop: '3em',
      padding: '0',
      boxShadow: 'rgba(0, 0, 0, 0.10) 0px 2px 6px, rgba(0, 0, 0, 0.10) 0px 2px 6px',
    };
    this.menuVisivel = window.innerWidth >= 768;
    this.mobile = window.innerWidth < 768;
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
