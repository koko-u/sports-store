import { Product } from './product.model'

export type CartLine = {
  product: Product
  quantity: number
}

export const totalOf = (line: CartLine): number => {
  return line.product.price * line.quantity
}

export const quantityAccumulator = (
  totalQuantity: number,
  line: CartLine
): number => {
  return totalQuantity + line.quantity
}

export const priceAccumulator = (
  totalPrice: number,
  line: CartLine
): number => {
  return totalPrice + line.product.price * line.quantity
}
