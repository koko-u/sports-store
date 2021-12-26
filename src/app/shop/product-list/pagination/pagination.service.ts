import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export type HalfOpenRange = {
  start: number
  end: number
}
const emptyRange: HalfOpenRange = { start: 0, end: 0 }
const createRange = (
  productPerPage: ProductPerPage,
  pageNumber: number
): HalfOpenRange => {
  return {
    start: productPerPage * (pageNumber - 1),
    end: productPerPage * pageNumber,
  }
}

/**
 * 整数の範囲で割り算を行います
 * @param x
 * @param y
 */
const div = (x: number, y: number): number => {
  return ~~(x / y)
}

/**
 * 全体の数をページごとの数で割り算して、ページの数だけ
 * 1, 2, ..., n のリストを作成する
 * @param totalCount 全体の数
 * @param perPage ページごとの数
 */
const createNums = (totalCount: number, perPage: number): number[] => {
  if (totalCount < 0) return []
  if (perPage <= 0) return []

  const size = div(totalCount, perPage) + (totalCount % perPage === 0 ? 0 : 1)

  return [...Array(size).keys()].map((i) => i + 1)
}

/**
 * ページあたりに表示する商品数として選択できる数のリストです
 *
 */
export const PageOptions: readonly ProductPerPage[] = [3, 4, 6, 8]

export type ProductPerPage = number

/**
 * ページネーションに必要となる変数を管理するためのサービスです
 *
 * products [p0, p1, p2, p3, p4, p5, p6, p7]
 * productCount 8
 * productPerPage 3
 * currentPageNo 2
 *
 * ->
 * [[p0, p1, p2], [p3, p4, p5], [p6, p7]]
 *                 ↑ 表示する商品
 *
 * <出力1>
 *  startIndex 3
 *  endIndex   6
 *  の範囲 [3, 6) をリアクティブに通知する
 *  この範囲を使って、商品を slice 表示する
 *
 * <出力2>
 *   productPerPage
 *
 * <出力3>
 *   currentPageNo
 *
 * <出力4>
 *   pageNumbers
 *  ページネーションに表示するページ数の連番 「1, 2, 3]
 *
 */
@Injectable()
export class PaginationService {
  /**
   * ページネーションの対象となる商品の数です
   * @private
   */
  private _productCount: number = 0

  /**
   * 1ページに表示する商品の数です
   *
   * @private
   */
  private _productPerPage: ProductPerPage = 3

  /**
   * 現在表示しているページ番号です
   *
   * @private
   */
  private _currentPageNo = new BehaviorSubject<number>(1)
  get currentPageNo$(): Observable<number> {
    return this._currentPageNo.asObservable()
  }

  /**
   * 画面に表示する商品の範囲です
   *
   * @private
   */
  private _productRange = new BehaviorSubject<HalfOpenRange>(emptyRange)
  get productRange$(): Observable<HalfOpenRange> {
    return this._productRange.asObservable()
  }

  private _pageNumbers = new BehaviorSubject<number[]>([])
  get pageNumbers$(): Observable<number[]> {
    return this._pageNumbers.asObservable()
  }

  constructor() {}

  /**
   * 商品数を変更します
   *
   * つぎの値が更新されて Subscriber に通知されます
   *
   * 1. 商品の表示範囲
   * 3. 現在のページ数
   * 4. ページ数のリスト
   * @param productCount
   */
  setProductCount(productCount: number) {
    if (productCount < 0) return
    if (this._productCount === productCount) return

    this._productCount = productCount
    const currentPageNo = this._currentPageNo.value

    // 4. 新しい商品数に対して、ページのリストをつくる
    const newPageNumbers = createNums(productCount, this._productPerPage)
    this._pageNumbers.next(newPageNumbers)

    // 現在のページよりも手前に存在している商品数を下回ってしまう場合、
    // 現在のページを最終ページに更新する
    const prevProductCounts = this._productPerPage * (currentPageNo - 1)
    if (productCount <= prevProductCounts) {
      this._currentPageNo.next(newPageNumbers.length)
    }

    const newRange = createRange(
      this._productPerPage,
      this._currentPageNo.value
    )
    this._productRange.next(newRange)
  }

  /**
   * 1ページに表示する商品数を変更します
   *
   * つぎの値が更新されて Subscriber に通知されます
   *
   * 1. 商品の表示範囲
   * 2. ページあたりの商品数
   * 3. 現在のページ数
   * 4. ページ数のリスト
   *
   * 例)
   * [[p0, p1, p2], [p3, p4, p5], [p6, p7]]  perPage: 3
   *                    ↑ current
   *
   * [[p0, p1, p2, p3] , [p4, p5, p6, p7]]   perPage: 4
   *       ↑ current は表示していた先頭の p3 が再度表示されるページに変更する
   *
   * @param perPage
   */
  changeProductPerPage(perPage: ProductPerPage) {
    if (this._productPerPage === perPage) return

    this._productPerPage = perPage

    const currentPageNo = this._currentPageNo.value
    // 変更前の現在のページのトップに位置するインデックス
    const pageTopIndex = this._productPerPage * (currentPageNo - 1)
    // トップの位置を含むページ番号
    const newCurrentPageNo = div(pageTopIndex + 1, perPage) + 1

    // 1. 新しいページ番号の位置と範囲で計算された範囲
    const newRange = createRange(perPage, newCurrentPageNo)
    this._productRange.next(newRange)

    // 3. 現在のページ数
    this._currentPageNo.next(newCurrentPageNo)

    // 4.
    this._pageNumbers.next(createNums(this._productCount, perPage))
  }

  /**
   * 現在のページ番号を変更します
   *
   * つぎの値が更新されて Subscriber に通知されます
   *
   * 1. 商品の表示範囲
   * 3. 現在のページ番号
   *
   * @param pageNo
   */
  changeCurrentPageNo(pageNo: number) {
    const currentPageNo = this._currentPageNo.value
    if (currentPageNo === pageNo) return

    const pageNumbers = this._pageNumbers.value

    if (pageNo <= 0 || pageNo > pageNumbers.length) return

    // 1.
    const newRange = createRange(this._productPerPage, pageNo)
    this._productRange.next(newRange)

    // 3.
    this._currentPageNo.next(pageNo)
  }
}
