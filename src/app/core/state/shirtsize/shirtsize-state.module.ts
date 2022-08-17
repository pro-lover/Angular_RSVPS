import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShirtSizeEffects } from "@core/state/shirtsize";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './shirtsize.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('shirtsizes', fromModel.shirtsizeReducer),
		EffectsModule.forFeature([ShirtSizeEffects])
	],
	declarations: []
})
export class ShirtSizeStateModule {}
