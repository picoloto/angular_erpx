import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-custom-breadcrumb',
  templateUrl: './custom-breadcrumb.component.html',
  styleUrls: ['./custom-breadcrumb.component.css']
})
export class CustomBreadcrumbComponent implements OnInit {

  breadcrumbItens: MenuItem[];
  @Output() listaItensClick = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.montaItensBreadcrumb();
  }

  private montaItensBreadcrumb() {
    this.breadcrumbItens = [
      {label: 'Lista de Itens', style: {cursor: 'pointer'}, command: () => this.listaItensClick.emit()},
    ];
    if (this.router.url !== '/lista-itens') {
      this.breadcrumbItens.push({label: 'Cadastro de item', routerLink: '/item'});
    }
  }
}
