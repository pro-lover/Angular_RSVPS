import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';

import { RsvpCompleteComponent, RsvpContactComponent, RsvpKinComponent, RsvpPage, RsvpPersonalComponent, RsvpProfileComponent, RsvpTravelComponent } from './';

const routes: Routes = [
	{
		path: ROUTER_UTILS.config.base.home,
		component: RsvpPage,

		data: {
			title: 'RSVP | TBWA Africa Conference 2022',
			description:
				'',
			robots: 'noindex, nofollow',
			animation: 'HomePage',
		},
		children: [
			{
				path: ROUTER_UTILS.config.base.rsvp.profile,
				component: RsvpProfileComponent,
				data: {
					title: 'Profile Details | TBWA Africa Conference 2022',
					description:
						'',
					robots: 'noindex, nofollow',
					animation: 'RsvpProfilePage',
				},
			},
			{
				path: ROUTER_UTILS.config.base.rsvp.contact,
				component: RsvpContactComponent,
				data: {
					title: 'Contact Details | TBWA Africa Conference 2022',
					description:
						'',
					robots: 'noindex, nofollow',
					animation: 'RsvpContactPage',
				},
			},
			{
				path: ROUTER_UTILS.config.base.rsvp.kin,
				component: RsvpKinComponent,
				data: {
					title: 'Next of Kin Details | TBWA Africa Conference 2022',
					description:
						'',
					robots: 'noindex, nofollow',
					animation: 'RsvpKinPage',
				},
			},
			{
				path: ROUTER_UTILS.config.base.rsvp.personal,
				component: RsvpPersonalComponent,
				data: {
					title: 'Personal Details | TBWA Africa Conference 2022',
					description:
						'',
					robots: 'noindex, nofollow',
					animation: 'RsvpPersonalPage',
				},
			},
			{
				path: ROUTER_UTILS.config.base.rsvp.travel,
				component: RsvpTravelComponent,
				data: {
					title: 'Travel Details | TBWA Africa Conference 2022',
					description:
						'',
					robots: 'noindex, nofollow',
					animation: 'RsvpTravelPage',
				},
			},
			{
				path: ROUTER_UTILS.config.base.rsvp.complete,
				component: RsvpCompleteComponent,
				data: {
					title: 'Registration Complete | TBWA Africa Conference 2022',
					description:
						'',
					robots: 'noindex, nofollow',
					animation: 'RsvpCompletePage',
				},
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RSVPRoutingModule {}
