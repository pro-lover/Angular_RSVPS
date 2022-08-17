import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountsEffects } from "@core/state/account";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './accounts.reducer';

@NgModule({
    imports: [
        CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
        StoreModule.forFeature('accounts', fromModel.accountsReducer),
        EffectsModule.forFeature([AccountsEffects])
    ],
    declarations: []
})
export class AccountStateModule {}
