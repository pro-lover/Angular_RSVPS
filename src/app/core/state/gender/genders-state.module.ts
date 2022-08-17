import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GendersEffects } from "@core/state/gender";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './genders.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('genders', fromModel.gendersReducer),
		EffectsModule.forFeature([GendersEffects])
	],
	declarations: []
})
export class GenderStateModule {}
