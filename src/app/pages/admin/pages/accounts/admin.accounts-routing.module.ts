import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';


const routes: Routes = [
	{
		path: ROUTER_UTILS.config.admin.accounts.root
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminAccountsRoutingModule {}
