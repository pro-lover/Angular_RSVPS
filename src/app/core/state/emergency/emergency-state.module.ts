import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmergencyEffects } from "@core/state/emergency";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './emergency.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forFeature('emergencies', fromModel.emergencyReducer),
		EffectsModule.forFeature([EmergencyEffects])
	],
	declarations: []
})
export class EmergencyStateModule {}
