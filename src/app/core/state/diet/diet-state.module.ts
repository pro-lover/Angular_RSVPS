import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DietEffects } from "@core/state/diet";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './diet.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('diet', fromModel.dietReducer),
		EffectsModule.forFeature([DietEffects])
	],
	declarations: []
})
export class DietStateModule {}
