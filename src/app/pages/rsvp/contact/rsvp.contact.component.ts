import { Location } from '@angular/common';
import {
	Component, EventEmitter, OnDestroy, OnInit, Output
} from '@angular/core';
import {
	FormBuilder, FormGroup,
	//FormControl,
	Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Country, Office } from '@app/core/models';
import {
	//phoneValidator,
	MustMatch
} from '@app/shared/validator';
import { AlertService, DelegateService } from '@core/services';
import * as OfficeActions from "@core/state/office/office.actions";
import * as OfficeSelectors from "@core/state/office/office.selector";


import * as CountryActions from "@core/state/country/country.actions";
import * as CountrySelectors from "@core/state/country/country.selector";

//import * as Bapp_Utils from '@core/utils';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { formatIncompletePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';

@Component({
	selector: 'app-rsvp-contact',
	templateUrl: './rsvp.contact.component.html',
	styleUrls: ['./rsvp.contact.component.scss']
})
export class RsvpContactComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config;

	// UI Variables
	public submitting = false;

	public dataOffices$!: Observable<Office[]>;
	public dataCountries$!: Observable<Country[]>;

	// Data for Step 2
	private formStep = 'contact';
	public FormGroupStep!:FormGroup;

	public getTelCountries: any[] = [];

	// Get an instance of `PhoneNumberUtil`.
	//private PNF = PhoneNumberFormat as any;
	//private phoneUtil  = PhoneNumberUtil as any;
	//private phoneValidator = new phoneUtil.AsYouType('US') as any;

	//
	@Output() UserDetailsEvent = new EventEmitter<any>();

	constructor(
		private store: Store,
		private router: Router,
		private location: Location,
		private alertService: AlertService,
		private _formBuilder: FormBuilder,
		private delegateService: DelegateService,
	) {



		this.storeInit();
		this.buildForm();

		this.dataOffices$ = this.store.select(OfficeSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataCountries$ = this.store.select(CountrySelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {

		this.getTelCountries = getCountries();

		//console.warn('phoneUtil countries:', this.getTelCountries);
		//console.warn('getCountryCallingCode:', getCountryCallingCode('ZA'));
		//console.warn('parsePhoneNumber :',  parsePhoneNumber('+27764622241').formatInternational());
		//console.warn('phoneValidator:',  new AsYouType().input( '+27764622241' ));

		//console.log( this.phoneUtil.format('+27764622241', this.PNF.INTERNATIONAL));

		this.dataOffices$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Office[]) =>  {

					//console.warn('this.dataOffices$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
	}

	ngOnDestroy(): void {
		//console.warn('RsvpContactComponent ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	// convenience getter for easy access to form fields
	get fStep() { return this.FormGroupStep.controls; }

	private storeInit():void {

		this.store.dispatch(new CountryActions.COLLECTION_LOAD_COUNTRIES());
		this.store.dispatch(new OfficeActions.COLLECTION_LOAD_OFFICES());
	}

	private buildForm():void {

		this.FormGroupStep = this._formBuilder.group({
				phoneDialCode: [''],
				phoneDialCodeCountry: [''],
				email: ['', [Validators.required, Validators.email]],
				emailConfirm: [{value:'', disabled: false}, Validators.required],
				mobileno: [
					{value:'', disabled: true},
					[
						Validators.required,
						Validators.minLength(15),
						Validators.maxLength(20),
					],
				],
				officeId: ['', Validators.required],
				otherOffice: [''],
			},
			/**/
			{
				validator: MustMatch('email', 'emailConfirm')
			},
			/**/
			/** /
			{
				validator: phoneValidator('mobileno')
			}
			/**/
		);

		this.prepFormListeners();
	}

	private prepFormListeners():void {

		/**/
		this.fStep['mobileno']
			.valueChanges
			.pipe(takeUntil(this._destroy$))
			.pipe(distinctUntilChanged())
			.subscribe((value) => {

				if( value === null || value === '' ) return;

				this.fStep['mobileno'].patchValue( formatIncompletePhoneNumber(value, this.fStep['phoneDialCodeCountry'].value ), {emitEvent: false});

			});
			/**/

		this.fStep['phoneDialCodeCountry']
			.valueChanges
			.pipe(takeUntil(this._destroy$))
			.pipe(distinctUntilChanged())
			.subscribe((value) => {
				if( value ) {
					//getCountryCallingCode(value);

					this.fStep['mobileno'].patchValue( '+' + getCountryCallingCode(value), {emitEvent: true});
					this.fStep['mobileno'].enable();
				}
			});

		this.fStep['officeId']
			.valueChanges
			.pipe(takeUntil(this._destroy$))
			.pipe(distinctUntilChanged())
			.subscribe((value) => {
				if( value && value !== 48 ) {
					this.fStep['otherOffice'].patchValue('N/A', {emitEvent: false});
				}
			});
	}

	public nextStep( path:string):void {

		this.submitting = true;

		if (this.FormGroupStep.invalid) {
			this.alertService.error('Please ensure all the fields are completed correctly.');
			console.error('Error Saving Model:', this.FormGroupStep.value);
			this.submitting = false;

			//this.passUserDetails();
			return;
		}

		this.router.navigate([`/rsvp/${path}`]);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
}

