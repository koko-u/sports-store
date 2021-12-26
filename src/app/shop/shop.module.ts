import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ModelModule } from '../repositories/model.module'

import { ShopComponent } from './shop.component'
import { CategorySelectionComponent } from './category-selection/category-selection.component'
import { ProductListComponent } from './product-list/product-list.component'
import { PaginationComponent } from './product-list/pagination/pagination.component'

import { SelectedCategoryService } from './selected-category.service'
import { CartSummaryComponent } from './cart-summary/cart-summary.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { SharedModule } from '../shared/shared.module'
import { ProductItemComponent } from './product-list/product-item/product-item.component'
import { CartDetailComponent } from './cart-detail/cart-detail.component'
import { CheckoutComponent } from './checkout/checkout.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    ShopComponent,
    CategorySelectionComponent,
    ProductListComponent,
    PaginationComponent,
    CartSummaryComponent,
    ProductItemComponent,
    CartDetailComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    ModelModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    RouterModule,
  ],
  exports: [ShopComponent, CartDetailComponent, CheckoutComponent],
  providers: [SelectedCategoryService],
})
export class ShopModule {}
