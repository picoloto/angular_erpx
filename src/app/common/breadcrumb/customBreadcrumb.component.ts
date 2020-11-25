import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-custom-breadcrumb',
  templateUrl: './customBreadcrumb.component.html',
  styleUrls: ['./customBreadcrumb.component.css']
})
export class CustomBreadcrumbComponent implements OnInit {

  breadcrumbItens: MenuItem[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.montaItensBreadcrumb();
  }

  private montaItensBreadcrumb() {
    this.breadcrumbItens = [
      {label: 'Lista de Itens', routerLink: '/lista-itens'},
    ];
    if (this.router.url !== '/lista-itens') {
      this.breadcrumbItens.push({label: 'Novo Item', routerLink: '/item'});
    }
  }
}
