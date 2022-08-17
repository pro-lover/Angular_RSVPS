import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Gender, Role } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import { selectById, selectCollection } from "@core/state/gender";
import * as ModelActions from "@core/state/gender/genders.actions";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as introJs from 'intro.js';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';


@Component({
	templateUrl: './add.edit.page.html',
	styleUrls: ['./add.edit.page.scss'],
})
export class GendersAddEditPage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	//user onboarding
	private introJS = introJs();

	public pageData$!:Observable<any>;
	public formDataGenders:any = [];

	private dataItem$!:Observable<any>;
	private dataItemId$:Observable<string>;

	public form!: FormGroup;
	private id!: string;
	public isAddMode!: boolean;
	public loading = false;
	public submitted = false;

	public Role = Role;
	public gender!: Gender;
	public account!: Account;

	constructor(
		private store: Store,
		private actions$: Actions<any>,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private location: Location,
		private accountService: AccountService,
		//private genderService: GenderService,
		private alertService: AlertService
	) {

		this.dataItemId$ = this.route.params
			.pipe(takeUntil(this._destroy$))
			.pipe(
				map((params) => params['id'])
			);

		this.dataItemId$
			.pipe(takeUntil(this._destroy$))
			.subscribe( (x) => {

				this.id = x;
				this.isAddMode = !this.id;
				//this.isAddModeSubject.next(!this.id);

				this.dataItem$ = this.store.select(
					selectById(
						parseInt(x)
					)
				);
			});

		this.account = this.accountService.accountValue;
		this.onboarding();
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	ngOnInit() {
		this.prepForm();
		this.initialise();
	}

	ngOnDestroy(): void {
		console.warn('Add Gender Page ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	onSubmit() {
		this.submitted = true;

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (this.form.invalid) {
			this.alertService.error('Please ensure all the Fields are completed correctly.');
			console.error('Error Saving:', this.form.value);
			return;
		}

		this.loading = true;
		/**/
		if (this.isAddMode) {
			this.createRecord();
		} else {
			this.updateRecord( this.form.value );
		}
		/**/
	}

	private initialise():void {

		this.store.dispatch(new ModelActions.appComponentInitialized());

		/** /
		console.log('Available Defaults:', {
			'formComponent': this.formComponent,
			'dataBanner': this.dataBanner,
			'dataContainer': this.dataContainer,
			'dataTemplate': this.dataTemplate
		});
		/**/

		this.pageData$ = combineLatest(
			[
				this.store.select(selectCollection)
			]
		)
		.pipe(
			map(([genders]):any => {
				// combineLatest returns an array of values, here we map those values to an object
				return { genders};
			})
		);

		this.pageData$.pipe(takeUntil(this._destroy$)).subscribe( (data:any) => {
			//console.info('Animation Dialog Component initialise', data);

			this.prepPageData(data);
		});

		this.dataItem$
			.pipe(takeUntil(this._destroy$))
			.subscribe( (x) => {
				//console.warn('Editing Model:', x);
				if( x === undefined ) {
					return;
				}
				this.form.patchValue(x);
			});
	}

	private prepForm():void {

		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			shortName: ['', Validators.required]
		});

		this.actions$
			.pipe(
				ofType(
					ModelActions.GenderActionTypes.MODEL_CreateSuccess,
					ModelActions.GenderActionTypes.MODEL_UpdateSuccess
				)
			)
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: () => {
					this.alertService.success('Update successful', { keepAfterRouteChange: true });
					this.loading = false;
					this.router.navigate(['../'], { relativeTo: this.route });
				},
				error: error => {
					this.alertService.error(error);
					this.loading = false;
				}
			});

		this.actions$
			.pipe(
				ofType(
					ModelActions.GenderActionTypes.MODEL_CreateFailed,
					ModelActions.GenderActionTypes.MODEL_UpdateFailed
				)
			)
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (data) => {
					this.alertService.error(data.payload.error, { keepAfterRouteChange: true });
					this.loading = false;
				},
				error: error => {
					this.alertService.error(error);
					this.loading = false;
				}
			});
	}

	private prepPageData(data:any):void {

		this.formDataGenders = data.genders;
		//this.formDataAnimationTypes = data.animationTypes;
		//this.formDataEasingTypes = data.easingTypes;

		//this.uiDataReady = true;
		//this.f['projectClient'].enable();

	}

	private getRandomArbitrary(min:number, max:number) {
		return Math.random() * (max - min) + min;
	}

	public back(): void {
		this.location.back();
	}

	private onboarding(): void {

		this.introJS.setOptions({
			showStepNumbers: true,
			showProgress: true
			/** /
			steps: [
				{
					title: 'Template Banner Design',
					intro: "As an Admin user, you can design the layout of for the banner."
				}

				{
					element: '.walkthrough-adding-components',
					intro: "Click here to create a new account.",
					position: 'bottom-right-aligned'
				},
				/** /
			],
			/** /
			hints: [
				{
					element: '#mat-tab-label-0-0',
					hint: 'Click here to add new components.',
					hintPosition: 'top-middle',
				},
				{
					element: '#mat-tab-label-0-1',
					hint: 'Once a component is added. It will be listed in this tab for you to edit/save.',
					hintPosition: 'top-middle'
				}
			]
			/**/
		});
	}

	public help(): void {

		//this.introJS.refresh();

		//this.introJS.addHints();

		//this.introJS.showHints();

		//this.introJS.start();

		this.alertService.info('Help/Onboarding Feature still in WIP.', { keepAfterRouteChange: true });
	}

	private createRecord() {
		this.store.dispatch(
			new ModelActions.MODEL_CreateInitiated({ dataItem: {
				...this.form.value
			}})
		);
	}

	private updateRecord( data: Gender) {

		this.store.dispatch(
			new ModelActions.MODEL_UpdateInitiated({ dataItem: {
				...data,
				id: this.id.toString(),
			}})
		);
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}

}
