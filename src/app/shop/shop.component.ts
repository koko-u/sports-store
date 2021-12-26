import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectedCategoryService } from './selected-category.service'

@Component({
  selector: 'ss-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  constructor() {}
}
