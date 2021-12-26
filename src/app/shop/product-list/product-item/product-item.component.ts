import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { Product } from '../../../models/product.model'
import { CartService } from '../../../repositories/cart.service'
import { Router } from '@angular/router'

@Component({
  selector: 'ss-product-item[product]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {
  private _product: Product | undefined
  get product(): Product {
    if (this._product === undefined)
      throw new Error('product property is undefined!')
    return this._product
  }
  @Input() set product(value) {
    this._product = value
  }

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  async addToCart(product: Product) {
    this.cartService.addLine(product)
    await this.router.navigateByUrl('/cart')
  }
}
