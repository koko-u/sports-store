import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { ShopComponent } from '../../shop/shop.component'

@Injectable()
export class ShoppingFirstGuard implements CanActivate {
  private _firstNavigation = true

  constructor(private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this._firstNavigation) return true

    this._firstNavigation = false
    if (route.component === ShopComponent) return true

    await this.router.navigateByUrl('/')
    return false
  }
}
