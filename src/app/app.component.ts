import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
	Account,
	Role
} from '@app/core/models';
import { AlertService } from '@app/core/services';
import { slideInAnimation } from '@app/shared/animations/animations';
import { AccountService } from '@core/services';
import { environment } from '@env/environment';
import { AuthService } from '@pages/auth/services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/ban-types
declare let gtag: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		slideInAnimation
	]
})
export class AppComponent implements OnInit {

	public Role = Role;
	public account: Account | undefined;

	public isLoggedIn$!: Observable<boolean>;

	public deviceInfo: any;

	previousUrl: string | undefined;

	constructor(
		private router: Router,
		private renderer: Renderer2,
		private accountService: AccountService,
		private deviceService: DeviceDetectorService,
		private authService: AuthService,
		private alertService: AlertService,
		private contexts: ChildrenOutletContexts,
		private $gaService: GoogleAnalyticsService
	) {

		this.accountService.account.subscribe( (x:any) =>  {
			if( x === null ) {

				this.renderer.removeClass( document.body, 'loggedIn-true' );

			} else {

				this.authService.isLoggedIn$.next(true);

				this.account = x;

				this.renderer.addClass( document.body, 'loggedIn-true' );
			}
		});

		this.router.events
			.subscribe((event) => {
				//console.log('router events: ', event);
				if (event instanceof NavigationStart) {

					if( document.getElementById('primaryNav') !== null ) {

						this.renderer.removeClass(document.getElementById('primaryNav'),  'show');
					}

					if (this.previousUrl) {
						this.renderer.removeClass(document.body,  'page-' + this.previousUrl);

					}
					event.url = event.url.replace(/\//g, '-');
					event.url = event.url.split('?')[0];
					const currentUrlSlug = event.url.slice(1);
					if (currentUrlSlug) {
						this.renderer.addClass( document.body, 'page-' + currentUrlSlug );
					}
					this.previousUrl = currentUrlSlug;

				} else if (event instanceof NavigationEnd) {
					gtag('config', environment.ga,
						{
							'page_path': event.urlAfterRedirects
						}
					);
				}
			});

		this.deviceFunction();

	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.runGlobalServices();
	}

	private runGlobalServices(): void {
		//this.seoService.init();
		//this.themeService.init();
	}

	private deviceFunction() {
		//console.log('hello `Home` component');
		this.deviceInfo = this.deviceService.getDeviceInfo();
		const isMobile = this.deviceService.isMobile();
		const isTablet = this.deviceService.isTablet();
		const isDesktopDevice = this.deviceService.isDesktop();
		//console.info('deviceInfo', this.deviceInfo);
		//console.log('isMobile', isMobile);  			// returns if the device is a mobile device (android / iPhone / windows-phone etc)
		//console.log('isTablet', isTablet);  				// returns if the device us a tablet (iPad etc)
		//console.log('isDesktopDevice', isDesktopDevice); 	// returns if the app is running on a Desktop browser.

		isMobile ? this.renderer.addClass(document.body, 'is-mobile') : this.renderer.removeClass(document.body, 'is-mobile');
		isTablet ? this.renderer.addClass(document.body, 'is-tablet') : this.renderer.removeClass(document.body, 'is-tablet');
		isDesktopDevice ? this.renderer.addClass(document.body, 'is-desktop') : this.renderer.removeClass(document.body, 'is-desktop');

		this.renderer.addClass(document.body, 'is-os-' + this.deviceInfo.os.toLowerCase() );
		this.renderer.addClass(document.body, 'is-browser-' + this.deviceInfo.browser.toLowerCase() );
		this.renderer.addClass(document.body, 'is-orientation-' + this.deviceInfo.orientation.toLowerCase() );
	}

	public getRouteAnimationData() {
		//console.log('getRouteAnimationData: ', this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']);
		return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
	}
}
