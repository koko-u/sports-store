import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Category } from '../models/category.model'

@Injectable()
export class SelectedCategoryService {
  private _selectedCategory$ = new BehaviorSubject<Category | undefined>(
    undefined
  )

  get selectedCategory$(): Observable<Category | undefined> {
    return this._selectedCategory$.asObservable()
  }

  constructor() {}

  select(category: Category) {
    this._selectedCategory$.next(category)
  }

  unselect() {
    this._selectedCategory$.next(undefined)
  }
}
