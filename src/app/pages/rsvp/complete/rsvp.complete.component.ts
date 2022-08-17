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
import { AlertService } from '@core/services';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-rsvp-complete',
	templateUrl: './rsvp.complete.component.html',
	styleUrls: ['./rsvp.complete.component.scss']
})
export class RsvpCompleteComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public path = ROUTER_UTILS.config;

	// UI Variables
	public submitting = false;

	// Data for Step 2
	private formStep = 'complete';
	public FormGroupStep!:FormGroup;

	constructor(
		private router: Router,
		private location: Location,
		private alertService: AlertService,
		private _formBuilder: FormBuilder
	) {

		this.buildForm();

	}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {
		//console.warn('RsvpPersonalComponent ngOnDestroy');
	}

	ngOnDestroy(): void {
		//console.warn('RsvpTravelComponent ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	// convenience getter for easy access to form fields
	get fStep() { return this.FormGroupStep.controls; }

	private buildForm():void {

		this.FormGroupStep = this._formBuilder.group({
			arrivalDate: [{value:'', disabled: false}, Validators.required],
			arrivalTime: [{value:'', disabled: false}, Validators.required],
			arrivalFlightNumber: [{value:'', disabled: false}, Validators.required],
			departureDate: [{value:'', disabled: false}, Validators.required],
			departureTime: [{value:'', disabled: false}, Validators.required],
			departureFlightNumber: [{value:'', disabled: false}, Validators.required],
		});

		//this.FormGroupVariations = new FormControl('', Validators.required);
	}

	public nextStep( path:string ):void {

		this.submitting = true;

		if (this.FormGroupStep.invalid) {
			this.alertService.error('Please ensure all the fields are completed correctly.');
			console.error('Error Saving Model:', this.FormGroupStep.value);
			this.submitting = false;

			//this.passUserDetails();
			return;
		}

		console.log('Commit Model to DB:', this.FormGroupStep.value);

		this.router.navigate([`/rsvp/${path}`]);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}
}

