import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Category } from '../../models/category.model'
import { ProductRepository } from '../../repositories/product.repository'
import { SelectedCategoryService } from '../selected-category.service'
import { map, Observable } from 'rxjs'

type CategoryWithActivity = {
  category: Category
  active: Observable<boolean>
}

@Component({
  selector: 'ss-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySelectionComponent implements OnInit {
  get categories(): CategoryWithActivity[] {
    return this.productRepository.getCategories().map((category) => {
      return {
        category,
        active: this.selectedCategory.selectedCategory$.pipe(
          map((selectedCategory) => selectedCategory === category)
        ),
      }
    })
  }

  constructor(
    private productRepository: ProductRepository,
    private selectedCategory: SelectedCategoryService
  ) {}

  ngOnInit(): void {}

  get nonSelectedCategories$(): Observable<boolean> {
    return this.selectedCategory.selectedCategory$.pipe(
      map((selectedCategory) => selectedCategory === undefined)
    )
  }

  isActive$(category: Category): Observable<boolean> {
    return this.selectedCategory.selectedCategory$.pipe(
      map((selectedCategory) => {
        if (selectedCategory) {
          return false
        } else {
          return category === selectedCategory
        }
      })
    )
  }

  clearCategory() {
    this.selectedCategory.unselect()
  }

  changeCategory(category: Category) {
    this.selectedCategory.select(category)
  }
}
