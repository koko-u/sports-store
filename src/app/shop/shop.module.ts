import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ModelModule } from '../models/model.module'

import { ShopComponent } from './shop.component'
import { CategorySelectionComponent } from './category-selection/category-selection.component'
import { ProductListComponent } from './product-list/product-list.component'
import { PaginationComponent } from './product-list/pagination/pagination.component'
import { CounterDirective } from './product-list/pagination/counter.directive'

@NgModule({
  declarations: [
    ShopComponent,
    CategorySelectionComponent,
    ProductListComponent,
    PaginationComponent,
    CounterDirective,
  ],
  imports: [CommonModule, ModelModule, ReactiveFormsModule],
  exports: [ShopComponent],
})
export class ShopModule {}
