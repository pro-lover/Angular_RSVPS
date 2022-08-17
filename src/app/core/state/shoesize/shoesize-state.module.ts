import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoeSizeEffects } from "@core/state/shoesize";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './shoesize.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('shoesizes', fromModel.shoesizeReducer),
		EffectsModule.forFeature([ShoeSizeEffects])
	],
	declarations: []
})
export class ShoeSizeStateModule {}
