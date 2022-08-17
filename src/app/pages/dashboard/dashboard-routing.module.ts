import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ROUTER_UTILS } from '@core/utils/router.utils';
import {
	DashboardComponent
} from './';

const routes: Routes = [
	{
		//path: ROUTER_UTILS.config.dashboard.root,
		path: '',
		component: DashboardComponent,
		data: {
			title: 'Dashboard | TBWA Africa Conference 2022',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'DashboardPage',
		},
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
