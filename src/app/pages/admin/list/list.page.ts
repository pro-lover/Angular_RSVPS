import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
//import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { Sort } from '@angular/material/sort';
//import { DialogConfirmComponent, DialogRestoreComponent } from '@app/components';
import { Account } from '@app/core/models';
import { AccountService, AlertService } from '@app/core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
	providers: [
		DatePipe
	]
})
export class AdminListPage implements OnInit, OnDestroy {

	// will use the _destroy$ observable to control
	// fetching items from an observable
	private _destroy$ = new Subject<boolean>();

	public myaccount!: Account;

	// MatPaginator Inputs
	public length!: number;
	public pageSize = 10;
	public currentPage = 0;
	public pageSizeOptions: number[] = [5, 10, 40, 100];

	// MatPaginator Output
	public pageEvent!: PageEvent;

	constructor(
		//private store: Store,
		private alertService: AlertService,
		private dialog: MatDialog,
		private location: Location,
		private accountService: AccountService,
		private datePipe: DatePipe
	) {

		this.accountService.account
			.pipe(takeUntil(this._destroy$))
			.subscribe((x:any) => this.myaccount = x);
	}

	ngOnInit() {
		console.log('Admin Default Initialised.');

	}

	ngOnDestroy(): void {
		console.warn('Admin Default ngOnDestroy');
		this._destroy$.next(false);
		this._destroy$.complete();
	}

}
