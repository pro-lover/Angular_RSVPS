export const ROUTER_UTILS = {
	config: {
		base: {
			home: '',
			about: 'about',
			rsvp: {
				root: 'rsvp',
				profile: 'profile',
				contact: 'contact-details',
				kin: 'next-of-kin',
				personal: 'personal-details',
				travel: 'travel-details',
				complete: 'complete'
			},
		},
		dashboard: {
			root: 'dashboard',
			notifications: 'notifications'
		},
		auth: {
			root: 'auth',
			signIn: 'login',
			signUp: 'register',
			forgotPassword: 'forgot-password',
			passwordReset: 'password-reset'
		},
		admin: {
			root: 'admin',
			accounts: {
				root: 'accounts',
				create: 'accounts/create',
				edit: 'accounts/edit/:id',
			},
			delegates: {
				root: 'delegates',
				create: 'delegates/create',
				edit: 'delegates/edit/:id',
			},
			offices: {
				root: 'offices',
				create: 'offices/create',
				edit: 'offices/edit/:id',
			},
			diet: {
				root: 'diet-options',
				create: 'diet-options/create',
				edit: 'diet-options/edit/:id',
			},
			countries: {
				root: 'countries',
				create: 'countries/create',
				edit: 'countries/edit/:id',
			},
			shirtsizes: {
				root: 'shirt-sizes',
				create: 'shirt-sizes/create',
				edit: 'shirt-sizes/edit/:id',
			},
			shoesizes: {
				root: 'shoe-sizes',
				create: 'shoe-sizes/create',
				edit: 'shoe-sizes/edit/:id',
			},
			gender: {
				root: 'gender',
				create: 'gender/create',
				edit: 'gender/edit/:id',
			}
		},
		errorResponse: {
			notFound: '404',
		},
	},
};
