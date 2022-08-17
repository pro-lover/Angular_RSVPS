import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfirmComponent, DialogRestoreComponent } from '@app/components';
import { Account, Gender } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
//import { deleteGenderItemInitiated, editItemStatusFormSubmitted, restoreItemInitiated, selectGenderItems } from "@core/state/gender";
import {
	selectCollection
} from "@core/state/gender";
import * as ModelActions from "@core/state/gender/genders.actions";
import { Store } from "@ngrx/store";
import * as introJs from 'intro.js';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
	providers: [
		DatePipe
	]
})
export class GendersListPage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public allData!: any[];
	public sortedData!: any[];
	public uiDataReady = false;

	public dataView$!: Observable<Gender[]>;

	public myaccount!: Account;

	//user onboarding
	private introJS = introJs();

	// MatPaginator Inputs
	public length!: number;
	public pageSize = 10;
	public currentPage = 0;
	public pageSizeOptions: number[] = [5, 10, 40, 100];

	// MatPaginator Output
	public pageEvent!: PageEvent;

	// Filter
	//  select filter data
	public statusFilterValue: any;

	constructor(
		private store: Store,
		private alertService: AlertService,
		private dialog: MatDialog,
		private location: Location,
		private accountService: AccountService,
		private datePipe: DatePipe
	) {

		this.statusFilterValue = new FormControl('');
		this.dataView$ = this.store.select(selectCollection);

		this.accountService.account
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.myaccount = x);

		this.onboarding();
	}

	ngOnInit() {

		this.store.dispatch(new ModelActions.appComponentInitialized());

		this.dataView$
			.pipe(takeUntil(this._destroy$))
			.subscribe(
				(data:Gender[]) =>  {

					//console.warn('this.dataView$', data);

					if( data === null ) return;
					this.initialise(data);

					//this.initialiseFilterData();
				}
			);
	}

	ngOnDestroy(): void {
		console.warn('Genders List ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

	private initialise( data:Gender[]):void {

		this.allData = data;
		this.sortedData = this.allData.slice();
		this.length = this.sortedData.length;

		this.iterator();

	}

	public toggleStatus(event:any, id: string):void {

		const model = this.allData.find((x) => x.id === id);
		//model.isDeleting = true;

		const confirmDialog = this.dialog.open( DialogConfirmComponent, {
			data: {
				title: 'Confirm Status change',
				message: 'Are you sure you want to update the status for: ' + model.name
			}
		});
		confirmDialog.afterClosed().subscribe(result => {
			if (result === true) {

				this.updateStatus(id, {
					status: event.checked
				});

			} else {
				console.info('Cancel updating status ID:', id, event);
				//model.isDeleting = false;

			}
		});

	}

	private updateStatus( id: string, params: any ):void {

		this.store.dispatch(
			new ModelActions.MODEL_UpdateStatusInitiated({
				dataId: id,
				params: params
			})
		);
	}

	public deleteModel(id: string): void {
		const model = this.allData.find((x) => x.id === id);
		//model.isDeleting = true;

		const confirmDialog = this.dialog.open( DialogConfirmComponent, {
			data: {
				title: 'Confirm Delete Action',
				message: 'Are you sure you want to delete: ' + model.name
			}
		});
		confirmDialog.afterClosed().subscribe(result => {
			if (result === true) {

				this.store.dispatch(new ModelActions.MODEL_DeleteInitiated({ dataId: id }) );

			} else {

				//console.info('Cancel Removing ID:', id);
				//model.isDeleting = false;

			}
		});
	}

	public restoreModel(id: string): void {
		const model = this.allData.find((x) => x.id === id);
		//model.isDeleting = true;

		const confirmDialog = this.dialog.open( DialogRestoreComponent, {
			data: {
				title: 'Confirm Restoration Action',
				message: 'Are you sure you want to restore this record: ' + model.name
			}
		});
		confirmDialog.afterClosed().subscribe(result => {
			if (result === true) {

				this.store.dispatch(new ModelActions.MODEL_RestoreInitiated({ dataId: id }) );

			} else {

				//console.info('Cancel Restoring record ID:', id);
				//model.isDeleting = false;
			}
		});
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

		this.alertService.info( 'Help/Onboarding Feature still in WIP..', { keepAfterRouteChange: true });
	}

	public audit( id:number ): void {

		const model = this.allData.find((x) => x.id === id);
		model.isVC = false;

		this.alertService.info( 'Version History still in WIP.', { keepAfterRouteChange: true });

	}

	public export(): void {

		const exportArray = this.allData.map( (data) => {

			return {
				'ID': data.id,
				'Name': data.name,
				'Short Name': data.shortName,
				'Status': (data.status === true) ? 'Active' : 'Inactive',
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
		XLSX.writeFile(wb, 'TSEBO_All_GENDERS.xlsx');

	}

	// FILTERS
	public onFilterChange( filter:string ): void {

		let newdata: any;

		newdata = this.allData;

		if( this.statusFilterValue.value && this.statusFilterValue.value !== undefined ) {
			newdata = newdata.filter((x:any) => {

				return x.status === this.statusFilterValue.value
			});
		}

		this.initialise(newdata);

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
				case 'name': return this.compare(a.name, b.name, isAsc);
				case 'shortName': return this.compare(a.shortName, b.shortName, isAsc);
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
		const part = this.allData.slice(start, end);
		this.sortedData = part;
	}

}
