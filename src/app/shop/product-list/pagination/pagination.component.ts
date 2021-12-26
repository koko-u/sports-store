import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {
  PageOptions,
  PaginationService,
  ProductPerPage,
} from './pagination.service'
import { combineLatest, concatMap, map, Observable, of, throwError } from 'rxjs'
import { FormControl, FormGroup } from '@ngneat/reactive-forms'

type PageNumber = {
  num: number
  current: boolean
}

@Component({
  selector: 'ss-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  /**
   * ページネーションに表示するページ数の配列です
   *
   * 現在のページ数に対して、アクティブなマークを付けます
   */
  get pageNumbers$(): Observable<PageNumber[]> {
    return combineLatest([
      this.paginationService.pageNumbers$,
      this.paginationService.currentPageNo$,
    ]).pipe(
      map(([numbers, currentPage]) => {
        return numbers.map((n) => {
          return {
            num: n,
            current: n === currentPage,
          }
        })
      })
    )
  }
  get pageOptions() {
    return PageOptions
  }

  pageSelection = new FormGroup({
    perPage: new FormControl<ProductPerPage>(3),
  })

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.pageSelection.controls.perPage.value$
      .pipe(
        concatMap((x) => {
          const perPage = Number(x)
          if (isNaN(perPage)) {
            return throwError(() => new Error(`${x} is not a number!`))
          } else {
            return of(perPage)
          }
        })
      )
      .subscribe((perPage) =>
        this.paginationService.changeProductPerPage(perPage)
      )
  }

  changePage(pageNumber: number) {
    this.paginationService.changeCurrentPageNo(pageNumber)
  }
}
