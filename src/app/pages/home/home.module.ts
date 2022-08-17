import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CloudflareStreamModule } from "@cloudflare/stream-angular";
import { ClickTrackingModule } from '@core/directives/click-tracking/click-tracking.module';
import { AccountStateModule } from '@core/state/account/accounts-state.module';
import { CountryStateModule } from '@core/state/country/country-state.module';
import { DelegateStateModule } from '@core/state/delegate/delegate-state.module';
import { DietStateModule } from '@core/state/diet/diet-state.module';
import { EmergencyStateModule } from '@core/state/emergency/emergency-state.module';
import { OfficeStateModule } from '@core/state/office/office-state.module';
import { ShirtSizeStateModule } from '@core/state/shirtsize/shirtsize-state.module';
import { ShoeSizeStateModule } from '@core/state/shoesize/shoesize-state.module';
import { TravelStateModule } from '@core/state/travel/travel-state.module';
import { environment } from '@env/environment';
//
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HomeRoutingModule } from './home-routing.module';
//
import { AboutPage, DialogVideoComponent, HomePage, WelcomeBannerComponent } from './pages';



@NgModule({
	declarations: [
		HomePage,
		AboutPage,
		DialogVideoComponent,
		WelcomeBannerComponent,
	],
	imports: [
		ClickTrackingModule,
		AccountStateModule,
		CountryStateModule,
		DelegateStateModule,
		DietStateModule,
		EmergencyStateModule,
		OfficeStateModule,
		ShoeSizeStateModule,
		ShirtSizeStateModule,
		TravelStateModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatTooltipModule,
		MatStepperModule,
		MatDialogModule,
		MatToolbarModule,
		MatCardModule,
		MatTabsModule,
		MatIconModule,
		MatButtonModule,
		CloudflareStreamModule,
		MatProgressBarModule,
		HomeRoutingModule,
		NgxSkeletonLoaderModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forRoot({}),
		EffectsModule.forRoot()
	],
})
export class HomeModule {}
