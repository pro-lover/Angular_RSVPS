import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import {
	GendersAddEditPage, GendersListPage
} from './';

const routes: Routes = [
	{
		path: '',
		component: GendersListPage,
		data: {
			breadcrumb: 'Genders'
		}
	},
	{
		path: ROUTER_UTILS.config.admin.gender.create,
		component: GendersAddEditPage,
		data: {
			breadcrumb: 'Add Gender'
		}
	},
	{
		path: ROUTER_UTILS.config.admin.gender.edit,
		component: GendersAddEditPage,
		data: {
			breadcrumb: 'Edit Gender'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminGendersRoutingModule {}
