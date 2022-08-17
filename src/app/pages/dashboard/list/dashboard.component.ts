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
	selector: 'app-dashboard-component',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

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
		//console.warn('Dashboard ngOnDestroy');
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
