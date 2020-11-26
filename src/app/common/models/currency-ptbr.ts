import {CurrencyMaskInputMode} from 'ngx-currency';

export class CurrencyPtbr {
  prefix = 'R$ ';
  precision = 2;
  allowNegative = false;
  inputMode = CurrencyMaskInputMode.FINANCIAL;
  decimal = ',';
  thousands = '.';
  allowZero = false;
}
