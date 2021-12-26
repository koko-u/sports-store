import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'
import {
  CartLine,
  totalOf,
  quantityAccumulator,
  priceAccumulator,
} from '../models/cart-line'
import { Product } from '../models/product.model'

const quantityProjection = (lines: CartLine[]): number => {
  return lines.reduce(quantityAccumulator, 0)
}
const priceProjection = (lines: CartLine[]): number => {
  return lines.reduce(priceAccumulator, 0)
}

@Injectable()
export class CartService {
  private _lines = new BehaviorSubject<CartLine[]>([])
  get lines$(): Observable<CartLine[]> {
    return this._lines.asObservable()
  }
  get itemCount$(): Observable<number> {
    return this._lines.pipe(map(quantityProjection))
  }
  get cartPrice$(): Observable<number> {
    return this._lines.pipe(map(priceProjection))
  }

  constructor() {}

  addLine(product: Product, quantity: number = 1) {
    const lines = this._lines.value
    const line = lines.find((line) => line.product.id === product.id)
    if (line) {
      line.quantity += quantity
      this._lines.next(lines)
    } else {
      this._lines.next([...lines, { product, quantity }])
    }
  }

  updateQuantity(product: Product, quantity: number) {
    const lines = this._lines.value
    const line = lines.find((line) => line.product.id === product.id)
    if (line) {
      line.quantity = quantity
      this._lines.next(lines)
    }
  }

  removeLine(id: number) {
    const lines = this._lines.value
    const target = lines.find((line) => line.product.id === id)
    if (target) {
      this._lines.next(lines.filter((line) => line.product.id !== id))
    }
  }

  clear() {
    this._lines.next([])
  }
}
