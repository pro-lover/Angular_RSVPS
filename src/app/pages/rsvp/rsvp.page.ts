import { Location } from '@angular/common';
import {
	Component, EventEmitter, OnDestroy, OnInit, Output
} from '@angular/core';
import {
	FormBuilder
} from '@angular/forms';
import { ChildrenOutletContexts, Router } from '@angular/router';
import {
	Account, Delegate, Role
} from '@app/core/models';
import { slideInAnimation } from '@app/shared/animations/animations';
import { AccountService, AlertService, DelegateService, EmergencyContactService, TravelService } from '@core/services';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
	templateUrl: './rsvp.page.html',
	styleUrls: ['./rsvp.page.scss'],
	animations: [
		slideInAnimation
	]
})
export class RsvpPage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config;

	public Role = Role;
	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;

	private formSteps = {
		profile: {
			complete: false,
			data: {}
		},
		contact: {
			complete: false,
			data: {}
		},
		kin: {
			complete: false,
			data: {}
		},
		personal: {
			complete: false,
			data: {}
		},
		travel: {
			complete: false,
			data: {}
		},
	} as any;

	// UI Variables

	// Data for Step 2
	//public FormGroupStepProfile!:FormGroup;
	private resetTimer:any;
	private delegateRegData = {} as any;

	//
	@Output() variationsEvent = new EventEmitter<any>();

	constructor(
		private location: Location,
		private alertService: AlertService,
		private _formBuilder: FormBuilder,
		private delegateService: DelegateService,
		private authService: AuthService,
		private accountService: AccountService,
		private travelService: TravelService,
		private emergencyContactService: EmergencyContactService,
		private contexts: ChildrenOutletContexts,
		private router: Router,
	) {

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
		//console.warn('RsvpPage ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	public receivedUserDetails(event:any) {
		//console.log('receivedUserDetails: ', event.FormGroupStep.value);
		//this.delegateRegData = {...event};
		Object.assign(this.delegateRegData, event.FormGroupStep.value);

		console.log('receivedUserDetails: ', this.delegateRegData);

		if( event.formStep === 'complete' ) {
			return;
		}

		this.formSteps[event.formStep].complete = true;
		this.formSteps[event.formStep].data = event.FormGroupStep.value;

		console.log('formSteps: ', this.formSteps);

	}

	public registerUserDetails(event:any) {

		console.warn('registerUserDetails['+event.formStep+']: ', event.FormGroupStep.value);

		if( event.formStep === 'complete' ) {

			if( Object.keys(this.delegateRegData).length === 0  ) {

				this.router.navigate(['/']);

			} else {

				console.warn('registerUserDetails: ', event);

				this.createDelegate();
			}

		} else {

			if( event.formStep !== 'profile' && Object.keys(this.delegateRegData).length === 0  ) {

				this.router.navigate(['/', 'rsvp', 'profile']);
			}

			//console.warn(event.formStep, this.delegateRegData);

		}
	}

	private validateFormFlow():boolean {

		if( Object.keys(this.delegateRegData).length === 0  ) {

			return false;

		} else {

			return true;
		}
	}

	private validateCreateDelegate():boolean {

		if ( this.formSteps.profile.complete === false ) {

			this.alertService.error('You haven\'t completed the profile step.');
			return false;

		} else if (this.formSteps.contact.complete === false ) {

			this.alertService.error('You haven\'t completed your contact information.');
			return false;

		} else if (this.formSteps.kin.complete === false ) {

			this.alertService.error('You haven\'t completed your next of kin information.');
			return false;

		} else if (this.formSteps.personal.complete === false ) {

			this.alertService.error('You haven\'t completed your dietary requirements.');
			return false;

		} else if (this.formSteps.travel.complete === false ) {

			if( ['N/A', 'No'].includes(this.delegateRegData?.flightRequired)) {

				return true;

			} else {

				this.alertService.error('You haven\'t completed your travel information.');
				return false;

			}

		} else {

			return true;
		}

		//return false;
	}

	private createDelegate():void {

		console.warn('createDelegate: ', this.delegateRegData);

		if( this.validateCreateDelegate() === false ) {

			//this.router.navigate(['/']);
			return;
		}

		this.delegateService.create(this.delegateRegData)
			.pipe(first())
			.subscribe({
				next: (delegateData:Delegate) => {

					console.info('Adding Emergency Contact.');

					this.createDelegateEmergencyContact({
						delegateId: delegateData.id,
						firstName: this.delegateRegData.firstNameKin,
						lastName: this.delegateRegData.lastNameKin,
						mobile: this.delegateRegData.contactNumberKin,
					});

				},
				error: error => {
					this.alertService.error(error);
					//this.loading = false;
				}
			});
	}

	private createDelegateEmergencyContact( data:any):void {

		this.emergencyContactService.create(data)
			.pipe(first())
			.subscribe({
				next: () => {

					if( ['N/A', 'No'].includes(this.delegateRegData?.flightRequired)) {

						this.alertService.success('Thank you. You\'ve submitted your registration information successfully.', { keepAfterRouteChange: true });

					} else {

						this.createDelegateTravelDetails({
							delegateId: data.delegateId,
							arrivalDate: this.delegateRegData.arrivalDate,
							departureDate: this.delegateRegData.departureDate,
							arrivalNumber: this.delegateRegData.arrivalFlightNumber,
							departureNumber: this.delegateRegData.departureFlightNumber,
						});
					}

					//this.router.navigate(['../'], { relativeTo: this.route });
				},
				error: error => {
					this.alertService.error(error);
				}
			});
	}

	private createDelegateTravelDetails( data:any):void {

		this.travelService.create(data)
			.pipe(first())
			.subscribe({
				next: () => {

					this.alertService.success('Thank you. You\'ve submitted your registration information successfully.', { keepAfterRouteChange: true });
					//this.router.navigate(['../'], { relativeTo: this.route });

					this.resetFormData();

					this.resetTimer = setTimeout(() => {
						this.router.navigate(['/']);
					} , 5000);

				},
				error: error => {
					this.alertService.error(error);
				}
			});
	}

	private updateDelegate( data:any ) {

		console.log('updateDelegate: ', this.delegateRegData);
		//return
        this.delegateService.update( data.id, data )
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Thank you. You\'ve updated your registration information successfully.', { keepAfterRouteChange: true });

					//this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    //this.loading = false;
                }
            });
	}

	private resetFormData():void {

		this.formSteps = {
			profile: {
				complete: false,
				data: {}
			},
			contact: {
				complete: false,
				data: {}
			},
			kin: {
				complete: false,
				data: {}
			},
			personal: {
				complete: false,
				data: {}
			},
			travel: {
				complete: false,
				data: {}
			},
		};

		this.delegateRegData = {};
	}

	public getRouteAnimationData() {
		//console.log('getRouteAnimationData: ', this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']);
		return this.contexts.getContext('formsteps')?.route?.snapshot?.data?.['animation'];
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
}

