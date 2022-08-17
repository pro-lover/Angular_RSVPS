import {
	Component, EventEmitter, OnDestroy, OnInit, Output
} from '@angular/core';
import {
	FormBuilder, FormGroup,
	//FormControl,
	Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
	Country,
	//Diet, Office,
	ShirtSize, ShoeSize
} from '@app/core/models';
import { AlertService, DelegateService } from '@core/services';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as CountryActions from "@core/state/country/country.actions";
import * as CountrySelectors from "@core/state/country/country.selector";
/** /
import * as DietActions from "@core/state/diet/diet.actions";
import * as DietSelectors from "@core/state/diet/diet.selector";

import * as OfficeActions from "@core/state/office/office.actions";
import * as OfficeSelectors from "@core/state/office/office.selector";
/**/
import * as ShirtSizeActions from "@core/state/shirtsize/shirtsize.actions";
import * as ShirtSizeSelectors from "@core/state/shirtsize/shirtsize.selector";

import * as ShoeSizeActions from "@core/state/shoesize/shoesize.actions";
import * as ShoeSizeSelectors from "@core/state/shoesize/shoesize.selector";

@Component({
	selector: 'app-rsvp-profile',
	templateUrl: './rsvp.profile.component.html',
	styleUrls: ['./rsvp.profile.component.scss']
})
export class RsvpProfileComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config;

	// UI Variables
	public submitting = false;

	private formStep = 'profile';

	//public dataDiet$!: Observable<Diet[]>;
	//public dataOffices$!: Observable<Office[]>;
	public dataShoeSizes$!: Observable<ShoeSize[]>;
	public dataShirtSizes$!: Observable<ShirtSize[]>;
	public dataCountries$!: Observable<Country[]>;

	// Data for Step 2
	public FormGroupStep!:FormGroup;

	//
	@Output() UserDetailsEvent = new EventEmitter<any>();

	constructor(
		private store: Store,
		private actions$: Actions<any>,
		private router: Router,
		private delegateService: DelegateService,
		private alertService: AlertService,
		private _formBuilder: FormBuilder
	) {

		this.storeInit();
		this.buildForm();

		//this.dataDiet$ = this.store.select(DietSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		//this.dataOffices$ = this.store.select(OfficeSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataCountries$ = this.store.select(CountrySelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataShoeSizes$ = this.store.select(ShoeSizeSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataShirtSizes$ = this.store.select(ShirtSizeSelectors.selectCollection).pipe(takeUntil(this._destroy$));

	}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {
		//console.warn('RsvpProfileComponent ngOnDestroy');

		this.dataCountries$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Country[]) =>  {

					//console.warn('this.dataCountries$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);

		this.dataShoeSizes$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:ShoeSize[]) =>  {

					//console.warn('this.dataShoeSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);

		this.dataShirtSizes$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:ShirtSize[]) =>  {

					//console.warn('this.dataShirtSizes$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
	}

	ngOnDestroy(): void {
		//console.warn('RsvpProfileComponent ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		//this.store.dispatch(new DietActions.COLLECTION_LOAD_DIET());
		//this.store.dispatch(new OfficeActions.COLLECTION_LOAD_OFFICES());
		this.store.dispatch(new CountryActions.COLLECTION_LOAD_COUNTRIES());
		this.store.dispatch(new ShoeSizeActions.COLLECTION_LOAD_SHOESIZES());
		this.store.dispatch(new ShirtSizeActions.COLLECTION_LOAD_SHIRTSIZES());

	}

	// convenience getter for easy access to form fields
	get fStep() { return this.FormGroupStep.controls; }

	private buildForm():void {

		this.FormGroupStep = this._formBuilder.group({
			firstName: [{value:'', disabled: false}, Validators.required],
			lastName: [{value:'', disabled: false}, Validators.required],
			designation: [{value:'', disabled: false}, Validators.required],
			countryId: ['', Validators.required],
			shirtsizeId: ['', Validators.required],
			shoesize: ['', Validators.required],
			passportNumber: ['', Validators.required]
		});

		//this.FormGroupVariations = new FormControl('', Validators.required);
	}

	private passUserDetails():void {
		this.UserDetailsEvent.emit(this.FormGroupStep.value);
	}

	public nextStep( path:string ):void {

		this.submitting = true;

		/**/
		if (this.FormGroupStep.invalid) {
			this.alertService.error('Please ensure all the fields are completed correctly.');
			console.error('Error Saving Model:', this.FormGroupStep.value);
			this.submitting = false;

			//this.passUserDetails();
			return;
		}
		/**/

		//this.delegateService.buildDelegate(this.FormGroupStep.value);

		this.router.navigate([`/rsvp/${path}`]);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
}

