import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OfficeEffects } from "@core/state/office";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './office.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('offices', fromModel.officeReducer),
		EffectsModule.forFeature([OfficeEffects])
	],
	declarations: []
})
export class OfficeStateModule {}
