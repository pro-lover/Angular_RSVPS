import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	Account
} from '@app/core/models';
import {
	AccountService
} from '@app/core/services';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

	public account: Account | undefined;
	public isLoggedIn$!: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private accountService: AccountService
	) {
		this.accountService.account.subscribe( (x:any) =>  {

			if( x === null ) {} else {
				this.account = x;
				this.authService.isLoggedIn$.next(true);
			}
		});
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
	}
}
