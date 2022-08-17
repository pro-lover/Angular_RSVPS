import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfirmComponent, DialogRestoreComponent } from '@app/components';
import { Account, Delegate, Office } from '@app/core/models';
import { AccountService, AlertService, DelegateService } from '@app/core/services';
import * as DelegateActions from "@core/state/delegate/delegate.actions";
import * as DelegateSelectors from "@core/state/delegate/delegate.selector";

import * as OfficeActions from "@core/state/office/office.actions";
import * as OfficeSelectors from "@core/state/office/office.selector";

import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject } from 'rxjs';
import { first, map, startWith, takeUntil } from 'rxjs/operators';
import * as XLSX from 'xlsx';






@Component({
	selector: 'app-table-delegates',
	templateUrl: './table.delegates.component.html',
	styleUrls: ['./table.delegates.component.scss'],
	providers: [
		DatePipe
	]
})
export class TableDelegatesListComponent implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	private allData!: any[];
	public uiDataReady = false;
	public primaryData!: any[];
	public sortedData!: any[];

	public dataView$!: Observable<Delegate[]>;
	public dataOffices$!: Observable<Office[]>;

	public account!: Account;

	//uiVars
	public isAuditing!: string;
	public isEditing!: string;
	public isDeleting!: string;
	public isRestoring!: string;

	// MatPaginator Inputs
	public length!: number;
	public pageSize = 10;
	public currentPage = 0;
	public pageSizeOptions: number[] = [5, 10, 40, 100];

	// MatPaginator Output
	public pageEvent!: PageEvent;

	// Filter
	// autocomplete
	public chipCtrl = new FormControl();
	public visible = true;
	public selectable = true;
	public removable = true;
	public addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	@ViewChild('chipInput') chipInput!: ElementRef;

	//  select filter data
	public statusFilterValue: FormControl;

	public officeFilterValue: FormControl;

	public selectAllActive = false;
	public userSelectedVariations: any = {};
	public selectedVariationsForDownload: any;
	@Output() userSelectedVariationsEvent = new EventEmitter<any>();

	// autocomplete filter
	public filteredNames!: Observable<any[] | undefined>;
	public activeNameFilters: any[] = [];
	public masterReference_names: any[] = [];

	constructor(
		private store: Store,
		private actions$: Actions<any>,
		private alertService: AlertService,
		private dialog: MatDialog,
		private location: Location,
		private accountService: AccountService,
		private datePipe: DatePipe,
		private delegateService: DelegateService
	) {

		this.storeInit();

		this.officeFilterValue = new FormControl('');

		this.statusFilterValue = new FormControl(true);

		this.selectedVariationsForDownload = new FormControl(null);

		this.accountService.account
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.account = x);

		this.dataView$ = this.store.select(DelegateSelectors.selectCollection).pipe(takeUntil(this._destroy$));
		this.dataOffices$ = this.store.select(OfficeSelectors.selectCollection).pipe(takeUntil(this._destroy$));
	}

	ngOnInit() {

		this.uiStateInfo();

		this.dataView$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Delegate[]) =>  {

					console.warn('this.dataView$', data);

					if( data === null || data.length <= 0 ) {
						this.allData = data;
						this.initialise(data);
						return;
					};

					this.allData = data;
					this.initialise(data);
					this.initialiseFilterData();
				}
			);


		this.dataOffices$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Office[]) =>  {

					console.warn('this.dataOffices$', data);
				}
			);
	}

	ngOnDestroy(): void {
		//console.warn('Animations List ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private storeInit():void {

		this.store.dispatch(new DelegateActions.COLLECTION_LOAD_DELEGATES());
		this.store.dispatch(new OfficeActions.COLLECTION_LOAD_OFFICES());

	}

	private uiStateInfo() {

		this.actions$
		.pipe(
			ofType(
				DelegateActions.DelegateActionTypes.MODEL_UpdateStatusSuccess,
				DelegateActions.DelegateActionTypes.MODEL_DeleteSuccess,
				DelegateActions.DelegateActionTypes.MODEL_RestoreSuccess
			)
		)
		.pipe(takeUntil(this._destroy$))
		.subscribe({
			next: () => {
				this.alertService.success('Action successful.', { keepAfterRouteChange: true });
			},
			error: error => {
				this.alertService.error(error);
			}
		});

		this.actions$
		.pipe(
			ofType(
				DelegateActions.DelegateActionTypes.MODEL_UpdateStatusFailed,
				DelegateActions.DelegateActionTypes.MODEL_DeleteFailed,
				DelegateActions.DelegateActionTypes.MODEL_RestoreFailed

			)
		)
		.pipe(takeUntil(this._destroy$))
		.subscribe({
			next: (data) => {
				this.alertService.error(data.payload.error, { keepAfterRouteChange: true });
			},
			error: error => {
				this.alertService.error(error);
			}
		});
	}

	private initialise( data:Delegate[]):void {

		this.primaryData = data;
		this.sortedData = this.primaryData.slice();
		this.length = this.sortedData.length;

		this.iterator();

	}

	public toggleStatus(event:any, id: string):void {

		/**/
		this.updateStatus(id, {
			status: event.checked
		});
		/**/
	}

	private updateStatus( id: string, params: any ):void {

		this.store.dispatch(
			new DelegateActions.MODEL_UpdateStatusInitiated({
				dataId: id,
				params: params
			})
		);

	}

	public deleteModel(id: string): void {
		const model = this.primaryData.find((x) => x.id === id);

		this.isDeleting = model.id;

		const confirmDialog = this.dialog.open( DialogConfirmComponent, {
			data: {
				title: 'Confirm Delete Action',
				message: 'Are you sure you want to delete: ' + model.name
			}
		});
		confirmDialog.afterClosed().subscribe(result => {

			this.isDeleting = '';

			if (result === true) {

				this.store.dispatch(new DelegateActions.MODEL_DeleteInitiated({ dataId: id }) );

			} else {
				//console.info('Cancel Removing ID:', id);
			}
		});
	}

	public restoreModel(id: string): void {
		const model = this.primaryData.find((x) => x.id === id);
		this.isRestoring = model.id;

		const confirmDialog = this.dialog.open( DialogRestoreComponent, {
			data: {
				title: 'Confirm Restoration Action',
				message: 'Are you sure you want to restore this record: ' + model.name
			}
		});
		confirmDialog.afterClosed().subscribe(result => {

			this.isRestoring = '';

			if (result === true) {

				this.store.dispatch(new DelegateActions.MODEL_RestoreInitiated({ dataId: id }) );

			} else {}
		});
	}

	public back(): void {
		this.location.back();
	}

	public audit( id:number ): void {

		const model = this.primaryData.find((x) => x.id === id);

		//this.isAuditing = model.id;

		this.alertService.info( 'Version History still in WIP.', { keepAfterRouteChange: true });

	}

	public export(): void {

		const exportArray = this.primaryData.map( (data) => {

			return {
				'ID': data.id,
				'Name': data.firstName,
				'Surname': data.lastName,
				'Title': data.designation,
				'Office': data.officeId,
				'Email': data.email,
				'Contact Number': data.mobileno,
				'Travel Details': (data.travels.lenghth > 0) ? 'Yes' : 'No',
				//'Status': (data.status === true) ? 'Active' : 'Inactive',
				'created': this.datePipe.transform(data.created, 'yyyy-MM-dd HH:mm:ss'),
				'updated': this.datePipe.transform(data.updated, 'yyyy-MM-dd HH:mm:ss'),
				'deletedAt': this.datePipe.transform(data.deletedAt, 'yyyy-MM-dd HH:mm:ss')
			}

		});

		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportArray);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, 'TBWA_Africa_Conference_All_Delegates_2022.xlsx');

	}

	// FILTERS
	private initialiseFilterData():void {

		this.initialiseTextFilters();

		this.onFilterChange('');

	}

	private initialiseTextFilters() {

		this.masterReference_names = this.allData.map( (jk: any) => {
			return {
				'id': jk.id,
				'email': jk.email
			}
		});
		//this.masterReference_locations = _.uniq(this.masterReference_locations, y => y.location);

		this.filteredNames = this.chipCtrl.valueChanges.pipe(
			startWith(null),
			map( (so: any | null) => {
				//console.warn('this.filteredNames:', so);

				if( Number(so) ) {
					return;
				}

				return so ? this.myTextFilter('email', so) : this.masterReference_names.slice()
		}));

	}

	private myTextFilter(type:string, name: string) {
		//console.warn(email);
		switch (type) {
			case 'email':
				return this.masterReference_names.filter(so => so.email.toLowerCase().indexOf(name.toLowerCase()) === 0);
			default:
				return [];
		}
	}

	public selectedTextFilter(event: MatAutocompleteSelectedEvent, type: string): void {

		//this.removeSelectedFiltered(type);
		//this.filterAlphabet = 'all';
		const newdb:any[] = [];

		switch (type) {
			case 'email':

				/** /
				this.sortedData = [this.allData.find(x => x.id === event.option.value)];
				this.length = this.sortedData.length;
				this.activeNameFilters = this.sortedData;
				/**/
				this.activeNameFilters.push(this.allData.find(x => x.email === event.option.value));

				if( this.activeNameFilters.length > 0 ) {
					this.activeNameFilters.forEach((x:any)=> {
						newdb.push(this.allData.filter((y:any) => {
							return y.email === x.email
						}));
					});
				}
				break;
			default:
				break;
		}

		//console.log('selectedTextFilter['+type+']:', this.sortedData);
		this.sortedData = newdb.flat();
		this.length = this.sortedData.length;

	}

	public removeSelectedFiltered(type:string): void {

		this.activeNameFilters = this.activeNameFilters.filter(x => x.email !== type);

		this.onFilterChange('');
	}

	public onFilterChange( filter:string ): void {

		let newdata: any;

		newdata = this.allData;

		if( this.officeFilterValue.value && this.officeFilterValue.value !== undefined ) {
			newdata = newdata.filter((x:any) => {
				return x.office.id === this.officeFilterValue.value
			});
		}

		if( this.statusFilterValue.value && this.statusFilterValue.value !== undefined ) {
			newdata = newdata.filter((x:any) => {

				return x.status === this.statusFilterValue.value
			});
		}

		if( this.activeNameFilters.length > 0 ) {
			const newbie:any[] = [];
			this.activeNameFilters.forEach((x:any)=> {
				newbie.push(newdata.filter((y:any) => {
					return y.email === x.email
				}));
			});

			newdata = newbie.flat();
		}

		this.initialise(newdata);

	}



	public selectAllToggle() {

		this.selectAllActive = this.selectAllActive === true ? false : true;

		this.selectedVariationsForDownload.value = this.selectAllActive;

		console.log('selectAllToggle:', this.selectAllActive);
	}

	public selectedVariationForDownload(id:number) {

		console.log('Selected ID:', id, this.selectedVariationsForDownload.value);

		if( this.selectedVariationsForDownload.value === true ) {

			this.userSelectedVariations[id] = this.allData[id];

		} else {

			delete this.userSelectedVariations[id];
		}

		console.log('userSelectedVariations:', this.userSelectedVariations);

		this.userSelectedVariationsEvent.emit(this.userSelectedVariations);

	}

	// NOTIFICATIONS
	public sendReminder(delegateId:number):void {

		const model = this.allData.find((x) => x.id === delegateId);

		//this.isDeleting = model.id;

		const confirmDialog = this.dialog.open( DialogConfirmComponent, {
			data: {
				title: '',
				message: 'Send Reminder to: ' + model.email
			}
		});
		confirmDialog.afterClosed().subscribe(result => {

			this.isDeleting = '';

			if (result === true) {

				//this.store.dispatch(new DelegateActions.MODEL_DeleteInitiated({ dataId: id }) );
				this.delegateService.sendReminder({
					'delegateId': delegateId,
					'type': 'reminder'
				})
				.pipe(first())
				.subscribe({
					next: (dss:any) => {

						console.info('sendReminder:', dss);

						if( dss.messageId ) {

							this.alertService.success('Reminder Sent.');

						} else {
							this.alertService.error(dss.response);
						}
					},
					error: error => {
						this.alertService.error(error);
					}
				});

			} else {
				console.info('Cancel Sending Reminder to ID:', delegateId);
			}
		});

	}

	public sendTravelRequest(delegateId:number):void {

		const model = this.allData.find((x) => x.id === delegateId);

		//this.isDeleting = model.id;

		const confirmDialog = this.dialog.open( DialogConfirmComponent, {
			data: {
				title: '',
				message: 'Send Request to: ' + model.email
			}
		});
		confirmDialog.afterClosed().subscribe(result => {

			this.isDeleting = '';

			if (result === true) {

				//this.store.dispatch(new DelegateActions.MODEL_DeleteInitiated({ dataId: id }) );
				this.delegateService.sendTravelRequest({
					'delegateId': delegateId,
					'type': 'travelrequest'
				})
				.pipe(first())
				.subscribe({
					next: (dss:any) => {

						console.info('sendTravelRequest:', dss);

						if( dss.messageId ) {

							this.alertService.success('Request Sent.');

						} else {
							this.alertService.error(dss.response);
						}
					},
					error: error => {
						this.alertService.error(error);
					}
				});

			} else {
				console.info('Cancel Sending sendTravelRequest to ID:', delegateId);
			}
		});

	}

	public sendConfirmation(delegateId:number):void {

		const model = this.allData.find((x) => x.id === delegateId);

		//this.isDeleting = model.id;

		const confirmDialog = this.dialog.open( DialogConfirmComponent, {
			data: {
				title: '',
				message: 'Send notification to: ' + model.email
			}
		});
		confirmDialog.afterClosed().subscribe(result => {

			this.isDeleting = '';

			if (result === true) {

				//this.store.dispatch(new DelegateActions.MODEL_DeleteInitiated({ dataId: id }) );
				this.delegateService.sendConfirmation({
					'delegateId': delegateId,
					'type': 'confirmation'
				})
				.pipe(first())
				.subscribe({
					next: (dss:any) => {

						console.info('sendConfirmation:', dss);

						if( dss.messageId ) {

							this.alertService.success('Notification Sent.');

						} else {
							this.alertService.error(dss.response);
						}
					},
					error: error => {
						this.alertService.error(error);
					}
				});

			} else {
				console.info('Cancel Sending confirmation to ID:', delegateId);
			}
		});

	}

	// PAGINATION FUNCS
	public sortData(sort: Sort) : void {

		const data = this.sortedData.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedData = data;
			return;
		}

		this.sortedData = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'id': return this.compare(a.id, b.id, isAsc);
				case 'firstName': return this.compare(a.firstName, b.firstName, isAsc);
				case 'lastName': return this.compare(a.lastName, b.lastName, isAsc);
				case 'designation': return this.compare(a.designation, b.designation, isAsc);
				case 'office': return this.compare(a.office.name, b.office.name, isAsc);
				case 'email': return this.compare(a.email, b.email, isAsc);
				case 'mobileno': return this.compare(a.mobileno, b.mobileno, isAsc);
				case 'status': return this.compare(a.status, b.status, isAsc);
				case 'lastEditedBy': return this.compare(a.lastEditedBy, b.lastEditedBy, isAsc);
				case 'created': return this.compare(a.created, b.created, isAsc);
				case 'updated': return this.compare(a.updated, b.updated, isAsc);
				case 'deletedAt': return this.compare(a.deletedAt, b.deletedAt, isAsc);
				default: return 0;
			}
		});
	}

	private compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) : number {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}

	public setPageSizeOptions(setPageSizeOptionsInput: string): void {
		if (setPageSizeOptionsInput) {
			this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
		}
	}

	public handlePage(e: any): void {
		this.currentPage = e.pageIndex;
		this.pageSize = e.pageSize;
		this.iterator();
	}

	private iterator(): void {
		const end = (this.currentPage + 1) * this.pageSize;
		const start = this.currentPage * this.pageSize;
		const part = this.primaryData.slice(start, end);
		this.sortedData = part;
	}

	public ListtrackByFn(index:number, item:any) {
		return index; // or item.id
	}

}
