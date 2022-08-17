import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AboutPage, HomePage } from './pages';

const routes: Routes = [
	{
		path: ROUTER_UTILS.config.base.home,
		component: HomePage,
		data: {
			title: 'Welcome | TBWA Africa Conference 2022',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'HomePage',
		}
	},
	{
		path: ROUTER_UTILS.config.base.about,
		component: AboutPage,
		data: {
			title: 'About | TBWA Africa Conference 2022',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'AboutPage',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
