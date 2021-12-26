import { Injectable } from '@angular/core'
import { Product } from '../models/product.model'
import { StaticDatasource } from './static.datasource'
import { Category } from '../models/category.model'

@Injectable()
export class ProductRepository {
  private _products: Product[] = []
  private _categories: Category[] = []

  constructor(private dataSource: StaticDatasource) {
    dataSource.getProducts().subscribe((products) => {
      this._products = products
      this._categories = [...new Set(products.map((p) => p.category))].sort()
    })
  }

  getProducts(category?: Category): Product[] {
    if (category) {
      return this._products.filter((p) => p.category === category)
    } else {
      return [...this._products]
    }
  }

  getProductById(id: number): Product | undefined {
    return this._products.find((p) => p.id === id)
  }

  getCategories(): Category[] {
    return this._categories
  }
}
