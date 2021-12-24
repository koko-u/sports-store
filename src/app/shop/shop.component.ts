import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ProductRepository } from '../models/product.repository'
import { Product } from '../models/product.model'

@Component({
  selector: 'ss-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  get products(): Product[] {
    return this.productRepository.getProducts()
  }
  get categories(): string[] {
    return this.productRepository.getCategories()
  }

  constructor(private productRepository: ProductRepository) {}

  ngOnInit(): void {}
}
