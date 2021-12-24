import { Injectable } from '@angular/core'
import { Product } from './product.model'
import { StaticDatasource } from './static.datasource'
import { map } from 'rxjs'

@Injectable()
export class ProductRepository {
  private _products: Product[] = []
  private _categories: string[] = []

  constructor(private dataSource: StaticDatasource) {
    dataSource.getProducts().subscribe((products) => {
      this._products = products
      this._categories = [...new Set(products.map((p) => p.category))].sort()
    })
  }

  getProducts(category?: string): Product[] {
    if (category) {
      return this._products.filter((p) => p.category === category)
    } else {
      return [...this._products]
    }
  }

  getProductById(id: number): Product | undefined {
    return this._products.find((p) => p.id === id)
  }

  getCategories(): string[] {
    return this._categories
  }
}
