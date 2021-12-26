import { Pipe, PipeTransform } from '@angular/core'
import { map, Observable } from 'rxjs'

@Pipe({
  name: 'not',
})
export class NotPipe implements PipeTransform {
  transform(value$: Observable<boolean>): Observable<boolean> {
    return value$.pipe(map((v) => !v))
  }
}
