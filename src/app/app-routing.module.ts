import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ShopComponent } from './shop/shop.component'
import { CartDetailComponent } from './shop/cart-detail/cart-detail.component'
import { CheckoutComponent } from './shop/checkout/checkout.component'
import { ShoppingFirstGuard } from './shared/guards/shopping-first.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shopping',
    pathMatch: 'full',
  },
  {
    path: 'shopping',
    component: ShopComponent,
    canActivate: [ShoppingFirstGuard],
  },
  {
    path: 'cart',
    component: CartDetailComponent,
    canActivate: [ShoppingFirstGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [ShoppingFirstGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ShoppingFirstGuard],
})
export class AppRoutingModule {}
