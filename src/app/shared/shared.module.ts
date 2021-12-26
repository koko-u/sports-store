import { NgModule } from '@angular/core'
import { NotPipe } from './pipes/not.pipe'
import { UsCurrencyPipe } from './pipes/us-currency.pipe'

@NgModule({
  declarations: [NotPipe, UsCurrencyPipe],
  imports: [],
  exports: [NotPipe, UsCurrencyPipe],
})
export class SharedModule {}
