import {Component, HostListener, OnInit} from '@angular/core';
import {MenuService} from '../menu/menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title = 'Desafio ERPX';
  botaoMenuVisivel: boolean;

  constructor(private menuService: MenuService) {
  }

  /**
   * @param event  Evento disparado conforme as alterações no tamanho da tela
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.botaoMenuVisivel = event.target.innerWidth < 768;
  }

  ngOnInit() {
    this.botaoMenuVisivel = window.innerWidth < 768;
  }

  menuClick() {
    this.menuService.alteraSituacaoMenu();
  }
}
