import {CurrencyMaskInputMode} from 'ngx-currency';

export class PtbrUtils {

  /**
   * @returns CurrencyOptions padrão para moeda brasileira
   */
  static getCurrencyOptions(): any {
    return {
      prefix: 'R$ ',
      precision: 2,
      allowNegative: false,
      inputMode: CurrencyMaskInputMode.FINANCIAL,
      decimal: ',',
      thousands: '.',
      allowZero: false,
    };
  }

  /**
   * @returns Padrão para o componente Calendar com a tradução brasileira
   */
  static getTraducaoData(): any {
    return {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
    };
  }
}
