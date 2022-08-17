import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountryEffects } from "@core/state/country";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './country.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('countries', fromModel.countryReducer),
		EffectsModule.forFeature([CountryEffects])
	],
	declarations: []
})
export class CountryStateModule {}
