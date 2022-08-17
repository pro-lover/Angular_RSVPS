import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	Account,
	Role
} from '@app/core/models';
import { AccountService } from '@core/services';
import { ThemeList, ThemeService } from '@core/services/theme';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';


@Component({
	templateUrl: './about.page.html',
	styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
	path = ROUTER_UTILS.config;
	theme = ThemeList;

	public Role = Role;
	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;

	constructor(
		private dialog: MatDialog,
		private authService: AuthService,
		private location: Location,
		private themeService: ThemeService,
		private accountService: AccountService,
	) {
		this.accountService.account.subscribe( (x:any) =>  {
			if( x === null ) {} else {

				this.authService.isLoggedIn$.next(true);

				this.account = x;
			}
		});
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
	}

	public onClickChangeTheme(theme: ThemeList): void {
		this.themeService.setTheme(theme);
	}

	public watchVideo(id:string, title:string): void {

		//console.log('Watch Video in Modal:', id);
		const previewDialog = this.dialog.open( DialogVideoComponent, {
			data: {
				id: id,
				title: title
			},
			width: '60vw'
		});

		previewDialog.afterClosed().subscribe(result => {

			console.log('Video Modal Closed', id);
		});
	}

	public back(): void {
		this.location.back();
	}
}

@Component({
	selector: 'app-dialog-video',
	templateUrl: 'dialog.video.component.html',
	styleUrls: ['dialog.video.component.scss']
})
export class DialogVideoComponent  implements OnInit {

	public videoId!: string;

	constructor(
		//private alertService: AlertService,
		//private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<DialogVideoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.videoId = this.data.id;
		console.log('DialogVideoComponent', this.videoId);
	}

	ngOnInit() {
		//this.isAddMode = !this.id;

		console.log('ngOnInit DialogVideoComponent', this.data);
		//this.videoId = this.data.id;

	}

	public onSubmit(): void {

		this.dialogRef.close(true);

	}
}
