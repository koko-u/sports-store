import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShopComponent } from './shop.component'
import { ModelModule } from '../models/model.module'

@NgModule({
  declarations: [ShopComponent],
  imports: [CommonModule, ModelModule],
  exports: [ShopComponent],
})
export class ShopModule {}
