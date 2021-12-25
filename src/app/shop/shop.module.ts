import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShopComponent } from './shop.component'
import { ModelModule } from '../models/model.module';
import { CategorySelectionComponent } from './category-selection/category-selection.component'

@NgModule({
  declarations: [ShopComponent, CategorySelectionComponent],
  imports: [CommonModule, ModelModule],
  exports: [ShopComponent],
})
export class ShopModule {}
