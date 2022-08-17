import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '@app/shared/guards';
import { Role } from '@core/models';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import {
	AdminListPage
} from './';
import { AccountsAddEditPage, AccountsListPage, CountryAddEditPage, CountryListPage, DietAddEditPage, DietListPage, GendersAddEditPage, GendersListPage, OfficesAddEditPage, OfficesListPage, ShirtSizesAddEditPage, ShoeSizesAddEditPage, ShoeSizesListPage, ShortSizesListPage } from './pages';


const AllRoles = [Role.User, Role.Client, Role.Designer, Role.Developer, Role.ProjectLeader, Role.QualityAssurance, Role.Admin];

const routes: Routes = [
	{
		path: '',
		component: AdminListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Admin',
			roles: AllRoles,
			animation: 'ListPage',
		},
	},
	///////////////////////
	// ACCOUNTS
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.accounts.root,
		component: AccountsListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Accounts',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/accounts/admin.accounts.module')).AdminAccountsModule
	},
	{
		path: ROUTER_UTILS.config.admin.accounts.create,
		component: AccountsAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Account',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/accounts/admin.accounts.module')).AdminAccountsModule
	},
	{
		path: ROUTER_UTILS.config.admin.accounts.edit,
		component: AccountsAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Account',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/accounts/admin.accounts.module')).AdminAccountsModule
	},
	///////////////////////
	// OFFICES
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.offices.root,
		component: OfficesListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Offices',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/offices/admin.offices.module')).AdminOfficesModule
	},
	{
		path: ROUTER_UTILS.config.admin.offices.create,
		component: OfficesAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Office',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/offices/admin.offices.module')).AdminOfficesModule
	},
	{
		path: ROUTER_UTILS.config.admin.offices.edit,
		component: OfficesAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Office',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/offices/admin.offices.module')).AdminOfficesModule
	},
	///////////////////////
	// DIET
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.diet.root,
		component: DietListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Diet Options',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/diet/admin.diet.module')).AdminDietModule
	},
	{
		path: ROUTER_UTILS.config.admin.diet.create,
		component: DietAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Diet',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/diet/admin.diet.module')).AdminDietModule
	},
	{
		path: ROUTER_UTILS.config.admin.diet.edit,
		component: DietAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Diet',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/diet/admin.diet.module')).AdminDietModule
	},
	///////////////////////
	// COUNTRIES
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.countries.root,
		component: CountryListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Countries',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/countries/admin.countries.module')).AdminCountriesModule
	},
	{
		path: ROUTER_UTILS.config.admin.countries.create,
		component: CountryAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Country',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/countries/admin.countries.module')).AdminCountriesModule
	},
	{
		path: ROUTER_UTILS.config.admin.countries.edit,
		component: CountryAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Country',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/countries/admin.countries.module')).AdminCountriesModule
	},
	///////////////////////
	// SHIRT-SIZES
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.shirtsizes.root,
		component: ShortSizesListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Shirt Sizes',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/shirtsizes/admin.shirtsizes.module')).AdminShirtSizesModule
	},
	{
		path: ROUTER_UTILS.config.admin.shirtsizes.create,
		component: ShirtSizesAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Shirt Size',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/shirtsizes/admin.shirtsizes.module')).AdminShirtSizesModule
	},
	{
		path: ROUTER_UTILS.config.admin.shirtsizes.edit,
		component: ShirtSizesAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Shirt Size',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/shirtsizes/admin.shirtsizes.module')).AdminShirtSizesModule
	},
	///////////////////////
	// SHOE-SIZES
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.shoesizes.root,
		component: ShoeSizesListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Shoe Sizes',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/shoesizes/admin.shoesizes.module')).AdminShoeSizesModule
	},
	{
		path: ROUTER_UTILS.config.admin.shoesizes.create,
		component: ShoeSizesAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Shoe Size',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/shoesizes/admin.shoesizes.module')).AdminShoeSizesModule
	},
	{
		path: ROUTER_UTILS.config.admin.shoesizes.edit,
		component: ShoeSizesAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Shoe Size',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/shoesizes/admin.shoesizes.module')).AdminShoeSizesModule
	},
	///////////////////////
	// GENDER
	///////////////////////
	{
		path: ROUTER_UTILS.config.admin.gender.root,
		component: GendersListPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Genders',
			roles: [Role.Admin],
			animation: 'ListPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/genders/admin.genders.module')).AdminGendersModule
	},
	{
		path: ROUTER_UTILS.config.admin.gender.create,
		component: GendersAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Add Gender',
			roles: [Role.Admin],
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/genders/admin.genders.module')).AdminGendersModule
	},
	{
		path: ROUTER_UTILS.config.admin.gender.edit,
		component: GendersAddEditPage,
		canActivate: [RoleGuard],
		data: {
			breadcrumb: 'Edit Gender',
			roles: AllRoles,
			animation: 'AddEditPage',
		},
		loadChildren: async () => (await import('@pages/admin/pages/genders/admin.genders.module')).AdminGendersModule
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
