import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { CartService } from '../../repositories/cart.service'
import { map, Observable } from 'rxjs'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'ss-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummaryComponent implements OnInit {
  get itemCount$(): Observable<number> {
    return this.cartService.itemCount$
  }
  get cartPrice$(): Observable<number> {
    return this.cartService.cartPrice$
  }
  get anyCartItem$(): Observable<boolean> {
    return this.cartService.itemCount$.pipe(map((itemCount) => itemCount > 0))
  }

  get faShoppingCart(): IconDefinition {
    return faShoppingCart
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}
