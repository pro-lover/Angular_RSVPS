import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Subject } from 'rxjs';
//import { filter, map, takeUntil } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/ban-types
declare let gtag: Function;

@Injectable({
	providedIn: 'root',
})
export class GAService  implements OnDestroy {
	destroy$ = new Subject();

	constructor(
		private $gaService: GoogleAnalyticsService
	) {
		gtag('config',  environment.ga, {
			'custom_map': {
				'dimension2': 'days',
				'metric1': 'team',
				'metric2': 'league'
			}
		});
		/** /
		gtag('config',  environment.ga, {
			'custom_map': {'dimension3': 'team'}
		});
		gtag('config',  environment.ga, {
			'custom_map': {'dimension4': 'league'}
		});
		/**/
	}

	public eventEmitter(
			eventName: string,
			eventCategory: string,
			eventAction: string,
			eventLabel?: string,
			eventValue?: number | string,
		):void {

			if( environment.production === false ) return;

			 gtag('event', eventName, {
					 eventCategory: eventCategory,
					 eventLabel: eventLabel,
					 eventAction: eventAction,
					 eventValue: eventValue
			});
	}

	// https://developers.google.com/analytics/devguides/collection/gtagjs/custom-dims-mets
	// Sends an event that passes 'age' as a parameter.
	public eventEmitterCalculation(
			eventValue: number,
			eventTeam: string,
			eventLeague: string,
		):void {

			if( environment.production === false ) return;
			gtag('event', 'days_dimension', {
					'days': eventValue,
					'team': eventTeam,
					'league': eventLeague
				}
			);
	}

	public eventEmitterTeam(
		eventValue: string,
	):void {
		if( environment.production === false ) return;
		gtag('event', 'team_dimension', {'team': eventValue});
	}

	public eventEmitterLeague(
		eventValue: string,
	):void {
		if( environment.production === false ) return;
		gtag('event', 'league_dimension', {'league': eventValue});
	}

	ngOnDestroy(): void {
		this.destroy$.complete();
		this.destroy$.unsubscribe();
	}
}
