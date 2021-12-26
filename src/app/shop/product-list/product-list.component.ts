import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { combineLatest, map, Observable, tap } from 'rxjs'
import { Product } from '../../models/product.model'
import { ProductRepository } from '../../models/product.repository'
import { SelectedCategoryService } from '../selected-category.service'
import { PaginationService } from './pagination/pagination.service'

@Component({
  selector: 'ss-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class ProductListComponent implements OnInit {
  /**
   * 画面の1ページに表示する商品のリストです
   * @private
   */
  private _products$: Observable<Product[]> | undefined
  get products$(): Observable<Product[]> {
    if (this._products$ === undefined) throw new Error()
    return this._products$
  }

  constructor(
    private productRepository: ProductRepository,
    private selectedCategory: SelectedCategoryService,
    private paginationService: PaginationService
  ) {}

  /**
   * 商品のリストを初期化します。
   *
   * 商品のリストは、現在選択されているカテゴリに応じて、全商品のリストがリアクティブに決まります
   * 全商品のリストがリアクティブに決まるに応じて、PaginationService が全商品数を Subscribe します。
   * ページネーションの設定が変化すると、商品を表示する範囲が変化するので、最終的に商品のリストが決まります
   *
   */
  ngOnInit(): void {
    const allProducts$ = this.selectedCategory.selectedCategory$.pipe(
      map((category) => this.productRepository.getProducts(category)),
      tap((products) => this.paginationService.setProductCount(products.length))
    )
    this._products$ = combineLatest([
      allProducts$,
      this.paginationService.productRange$,
    ]).pipe(
      map(([allProducts, { start, end }]) => allProducts.slice(start, end))
    )

    // this.selectedCategory.selectedCategory$
    //   .pipe(
    //     map((selectedCategory) => {
    //       if (selectedCategory) {
    //         return this.productRepository.getProducts(selectedCategory).length
    //       } else {
    //         return this.productRepository.getProducts().length
    //       }
    //     }),
    //     tap((v) => console.log('productCount', { v }))
    //   )
    //   .subscribe(this.paginationService.setProductCount)

    // this._products$ = combineLatest([
    //   this.selectedCategory.selectedCategory$,
    //   this.paginationService.productRange$,
    // ]).pipe(
    //   tap((v) => console.log('products', { v })),
    //   map(([selectedCategory, { start, end }]) =>
    //     this.productRepository.getProducts(selectedCategory).slice(start, end)
    //   )
    // )
    //
    // this.paginationService.setProductCount(15)

    // this._products$ = this.selectedCategory.selectedCategory$.pipe(
    //   map((selectedCategory) => {
    //     if (selectedCategory) {
    //       return this.productRepository.getProducts(selectedCategory)
    //     } else {
    //       return this.productRepository.getProducts()
    //     }
    //   }),
    //   concatMap((products) => {
    //     this.paginationService.setProductCount(products.length)
    //     return this.paginationService.productRange$.pipe(
    //       map((range) => {
    //         return products.slice(range.start, range.end)
    //       })
    //     )
    //   })
    // )
  }
}
