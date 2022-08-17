import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DelegateEffects } from "@core/state/delegate";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './delegate.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('delegates', fromModel.delegateReducer),
		EffectsModule.forFeature([DelegateEffects])
	],
	declarations: []
})
export class DelegateStateModule {}
