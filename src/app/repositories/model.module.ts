import { NgModule } from '@angular/core'
import { StaticDatasource } from './static.datasource'
import { ProductRepository } from './product.repository'
import { CartService } from './cart.service'

@NgModule({
  declarations: [],
  imports: [],
  providers: [StaticDatasource, ProductRepository, CartService],
})
export class ModelModule {}
