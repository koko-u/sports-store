import { Injectable } from '@angular/core'
import { Product } from './product.model'
import { Observable, of } from 'rxjs'

@Injectable()
export class StaticDatasource {
  private readonly _products: Product[]

  constructor() {
    this._products = [...Array(15).keys()].map((i) => {
      const id = i + 1
      const name = `Product ${id}`
      const category = `Category ${~~(i / 5) + 1}`
      return {
        id: id,
        name: name,
        category: category,
        description: `${name} (${category})`,
        price: 100,
      }
    })
  }

  getProducts(): Observable<Product[]> {
    return of(this._products)
  }
}
