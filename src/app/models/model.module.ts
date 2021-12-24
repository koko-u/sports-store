import { NgModule } from '@angular/core'
import { StaticDatasource } from './static.datasource'
import { ProductRepository } from './product.repository'

@NgModule({
  declarations: [],
  imports: [],
  providers: [StaticDatasource, ProductRepository],
})
export class ModelModule {}
