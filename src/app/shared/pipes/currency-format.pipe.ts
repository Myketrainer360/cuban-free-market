import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currency: string = 'CUP'): string {
    if (value === null || value === undefined) {
      return '';
    }

    const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    switch (currency.toUpperCase()) {
      case 'USD':
        return `$${formattedValue}`;
      case 'EUR':
        return `€${formattedValue}`;
      case 'CUP':
        return `${formattedValue} CUP`;
      default:
        return `${formattedValue} ${currency}`;
    }
  }
}
