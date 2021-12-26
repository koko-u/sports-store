import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'

/**
 *
 * ng-template ssCounter
 */
@Directive({
  selector: '[ssCounter]',
})
export class CounterDirective implements OnChanges {
  private _ssCounterOf: number | undefined
  @Input()
  set ssCounterOf(value: number) {
    this._ssCounterOf = value
  }

  /**
   * コンストラクタです
   *
   * @param container このディレクティブを記述している要素です
   * @param template ディレクティブが作成する ng-template のコンテンツです
   *
   */
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this._ssCounterOf) return

    this.container.clear()
    for (let i = 0; i < this._ssCounterOf; i++) {
      this.container.createEmbeddedView(this.template, {
        $implicit: i + 1,
        active: i === 2,
      })
    }
  }
}
