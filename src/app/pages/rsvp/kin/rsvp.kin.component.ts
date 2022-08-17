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
import { Country } from '@app/core/models';
import { AlertService } from '@core/services';
import * as CountryActions from "@core/state/country/country.actions";
import * as CountrySelectors from "@core/state/country/country.selector";
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { formatIncompletePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';

@Component({
	selector: 'app-rsvp-kin',
	templateUrl: './rsvp.kin.component.html',
	styleUrls: ['./rsvp.kin.component.scss']
})
export class RsvpKinComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config;

	// UI Variables
	public submitting = false;

	// Data for Step 2
	private formStep = 'kin';
	public FormGroupStep!:FormGroup;
	public dataCountries$!: Observable<Country[]>;

	public getTelCountries: any[] = [];

	//
	@Output() UserDetailsEvent = new EventEmitter<any>();

	constructor(
		private router: Router,
		private store: Store,
		private location: Location,
		private alertService: AlertService,
		private _formBuilder: FormBuilder,

	) {

		this.storeInit();
		this.buildForm();
		this.dataCountries$ = this.store.select(CountrySelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {
		//console.warn('RsvpProfileComponent ngOnDestroy');
		this.getTelCountries = getCountries();
	}

	ngOnDestroy(): void {
		//console.warn('RsvpKinComponent ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	// convenience getter for easy access to form fields
	get fStep() { return this.FormGroupStep.controls; }

	private storeInit():void {

		this.store.dispatch(new CountryActions.COLLECTION_LOAD_COUNTRIES());
	}

	private buildForm():void {

		this.FormGroupStep = this._formBuilder.group({
			phoneDialCode: [''],
			phoneDialCodeCountry: [''],
			firstNameKin: [{value:'', disabled: false}, Validators.required],
			lastNameKin: [{value:'', disabled: false}, Validators.required],
			//contactNumberKin: [{value:'', disabled: false}, Validators.required],
			contactNumberKin: [
				{value:'', disabled: true},
				[
					Validators.required,
					Validators.minLength(15),
					Validators.maxLength(20),
				],
			],
		});

		this.prepFormListeners();
	}

	private prepFormListeners():void {

		/**/
		this.fStep['contactNumberKin']
			.valueChanges
			.pipe(takeUntil(this._destroy$))
			.pipe(distinctUntilChanged())
			.subscribe((value) => {

				if( value === null || value === '' ) return;

				this.fStep['contactNumberKin'].patchValue( formatIncompletePhoneNumber(value, this.fStep['phoneDialCodeCountry'].value ), {emitEvent: false});

			});
			/**/

		this.fStep['phoneDialCodeCountry']
			.valueChanges
			.pipe(takeUntil(this._destroy$))
			.pipe(distinctUntilChanged())
			.subscribe((value) => {
				if( value ) {
					//getCountryCallingCode(value);

					this.fStep['contactNumberKin'].patchValue( '+' + getCountryCallingCode(value), {emitEvent: true});
					this.fStep['contactNumberKin'].enable();
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
}

