import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core'
import { ProductRepository } from '../models/product.repository'
import { Product } from '../models/product.model'
import { Category } from '../models/category.model'
import { SelectedCategoryService } from './selected-category.service'
import { map, Observable, Subscription } from 'rxjs'

@Component({
  selector: 'ss-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SelectedCategoryService],
})
export class ShopComponent implements OnInit {
  private _products$: Observable<Product[]> | undefined
  get products$(): Observable<Product[]> {
    if (this._products$ === undefined) throw new Error()
    return this._products$
  }

  private _selectedCategory: Category | undefined

  constructor(
    private productRepository: ProductRepository,
    private selectedCategory: SelectedCategoryService
  ) {}

  ngOnInit(): void {
    this._products$ = this.selectedCategory.selectedCategory$.pipe(
      map((selectedCategory) => {
        if (selectedCategory) {
          return this.productRepository.getProducts(selectedCategory)
        } else {
          return this.productRepository.getProducts()
        }
      })
    )
  }
}
