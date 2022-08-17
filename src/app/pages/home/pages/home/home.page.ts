import {
	Component, OnDestroy, OnInit
} from '@angular/core';
import {
	Account,
	Role
} from '@app/core/models';
import { AccountService } from '@core/services';
import { ThemeList, ThemeService } from '@core/services/theme';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	path = ROUTER_UTILS.config;
	theme = ThemeList;

	public Role = Role;
	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;

	private refreshCarousel: BehaviorSubject<boolean>;
	public refreshCarousel$: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private themeService: ThemeService,
		private accountService: AccountService,
	) {

		this.refreshCarousel = new BehaviorSubject<boolean>(false);
		this.refreshCarousel$ = this.refreshCarousel.asObservable();

		this.accountService.account
		.pipe(takeUntil(this._destroy$))
		.subscribe( (x:any) =>  {
			if( x === null ) {} else {

				this.authService.isLoggedIn$.next(true);

				this.account = x;
			}
		});
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
	}

	ngOnDestroy(): void {
		//console.warn('Card Profile ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	/**/
	public carouselElementReady($event:any):void {
		//console.warn('Carousel Element Ready:', $event);
		this.refreshCarousel.next($event);
	}
	/**/

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
}

@Component({
	selector: 'app-welcome-banner',
	templateUrl: './home.banner.welcome.html',
	styleUrls: ['./home.banner.welcome.scss'],
})
export class WelcomeBannerComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	constructor(
		private authService: AuthService,
		private themeService: ThemeService,
		private accountService: AccountService,
	) {}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
	ngOnInit(): void {}

	ngOnDestroy(): void {
		//console.warn('WelcomeBanner ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

}
