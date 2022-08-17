import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '@app/core/services';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginActivateGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService,
		private accountService: AccountService
	) {}

	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {

			///
			const isLoggedIn = this.authService.isLoggedIn;
			const { root, signIn } = ROUTER_UTILS.config.auth;

			if (isLoggedIn) {
				this.router.navigate(['/', ROUTER_UTILS.config.dashboard.root]);
				//return true;
			}

			return true;

	}
}
