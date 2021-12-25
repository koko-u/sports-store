import { Category } from './category.model'

export type Product = {
  id: number
  name: string
  category: Category
  description: string
  price: number
}
