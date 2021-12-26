import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { CartService } from '../../repositories/cart.service'
import { map, Observable } from 'rxjs'
import { CartLine } from '../../models/cart-line'

@Component({
  selector: 'ss-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailComponent implements OnInit {
  get cartLines$(): Observable<CartLine[]> {
    return this.cartService.lines$
  }
  get isEmptyCart$(): Observable<boolean> {
    return this.cartService.itemCount$.pipe(map((count) => count === 0))
  }
  get cartPrice$(): Observable<number> {
    return this.cartService.cartPrice$
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  updateQuantity(line: CartLine, event: Event) {
    const target = event.target as HTMLInputElement
    const quantity = Number(target.value)
    if (isNaN(quantity)) return

    this.cartService.updateQuantity(line.product, quantity)
  }

  removeLine(line: CartLine) {
    this.cartService.removeLine(line.product.id)
  }
}
