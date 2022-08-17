import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { PasswordResetPage } from './pages/password-reset/password-reset.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';

const routes: Routes = [
	{
		path: ROUTER_UTILS.config.auth.signIn,
		component: SignInPage,
		data: {
			title: 'Log in | TBWA Africa Conference',
			description:'',
			robots: 'noindex, nofollow',
			animation: 'SignInPage',
		}
	},
	{
		path: ROUTER_UTILS.config.auth.signUp,
		component: SignUpPage,
		data: {
			title: 'Create your account | TBWA Africa Conference',
			description:'',
			robots: 'noindex, nofollow',
			animation: 'SignUpPage',
		}
	},
	{
		path: ROUTER_UTILS.config.auth.forgotPassword,
		component: ForgotPasswordPage,
		data: {
			title: 'Reset your account password | TBWA Africa Conference',
			description:'',
			robots: 'noindex, nofollow',
			animation: 'ForgotPasswordPage',
		}
	},
	/** /
	{
		path: ROUTER_UTILS.config.auth.forgotPasswordEmailSent,
		component: ForgotPasswordEmailSentPage,
	},
	/**/
	{
		path: ROUTER_UTILS.config.auth.passwordReset,
		component: PasswordResetPage,
		data: {
			title: 'Reset your account password | TBWA Africa Conference',
			description:'',
			robots: 'noindex, nofollow',
			animation: 'PasswordResetPage',
		}
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
