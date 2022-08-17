import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TravelEffects } from "@core/state/travel";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './travel.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('travel', fromModel.travelReducer),
		EffectsModule.forFeature([TravelEffects])
	],
	declarations: []
})
export class TravelStateModule {}
