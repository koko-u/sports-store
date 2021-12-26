import { Pipe, PipeTransform } from '@angular/core'
import { formatCurrency, getCurrencySymbol } from '@angular/common'

@Pipe({
  name: 'usCurrency',
})
export class UsCurrencyPipe implements PipeTransform {
  private readonly _locale = 'en-US'
  private readonly _currencyCode = 'USD'
  private readonly _digitsInfo = '2.2-2'

  transform(value: number | null): string {
    if (!value) return ''

    return formatCurrency(
      value,
      this._locale,
      getCurrencySymbol(this._currencyCode, 'narrow', this._locale),
      this._currencyCode,
      this._digitsInfo
    )
  }
}
