import { Location } from '@angular/common';
import {
	Component, OnDestroy, OnInit
} from '@angular/core';
import {
	FormBuilder, FormGroup,
	//FormControl,
	Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Diet } from '@app/core/models';
import { AlertService } from '@core/services';
import * as DietActions from "@core/state/diet/diet.actions";
import * as DietSelectors from "@core/state/diet/diet.selector";
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-rsvp-personal',
	templateUrl: './rsvp.personal.component.html',
	styleUrls: ['./rsvp.personal.component.scss']
})
export class RsvpPersonalComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config;

	// UI Variables
	public submitting = false;

	// Data for Step 2
	private formStep = 'personal';
	public FormGroupStep!:FormGroup;
	public dataDiet$!: Observable<Diet[]>;

	constructor(
		private store: Store,
		private router: Router,
		private location: Location,
		private alertService: AlertService,
		private _formBuilder: FormBuilder
	) {

		this.storeInit();
		this.buildForm();
		this.dataDiet$ = this.store.select(DietSelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {
		//console.warn('RsvpPersonalComponent ngOnDestroy');
		this.dataDiet$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Diet[]) =>  {

					//console.warn('this.dataDiet$', data);

					if( data === null || data.length <= 0 ) return;
				}
			);
	}

	ngOnDestroy(): void {
		//console.warn('RsvpPersonalComponent ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	// convenience getter for easy access to form fields
	get fStep() { return this.FormGroupStep.controls; }

	private storeInit():void {

		this.store.dispatch(new DietActions.COLLECTION_LOAD_DIET());
	}

	private buildForm():void {

		this.FormGroupStep = this._formBuilder.group({
			dietId: [{value:'', disabled: false}, Validators.required],
			additionalDiet: [{value:'', disabled: false}, Validators.required],
			medicalcondition: [{value:'', disabled: false}, Validators.required],
			medicalconditionRequired: ['', Validators.required],
			allergies: [''],
			flightRequired: ['', Validators.required],
		});

		//this.FormGroupVariations = new FormControl('', Validators.required);

		this.prepFormListeners();
	}

	private prepFormListeners():void {

		this.fStep['dietId']
			.valueChanges
			.pipe(takeUntil(this._destroy$))
			.pipe(distinctUntilChanged())
			//.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
			.subscribe((value) => {
				if( value && value === 3 ) {
					this.fStep['additionalDiet'].patchValue('', {emitEvent: false});
				} else {
					this.fStep['additionalDiet'].patchValue('N/A', {emitEvent: false});
				}
			});

		this.fStep['medicalconditionRequired']
			.valueChanges
			.pipe(takeUntil(this._destroy$))
			.pipe(distinctUntilChanged())
			//.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
			.subscribe((value) => {
				if( value && value === 'No' ) {
					this.fStep['medicalcondition'].patchValue('N/A', {emitEvent: false});
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

		//if( path === 'register' )

		this.router.navigate([`/rsvp/${path}`]);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
}

