import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
//
import { environment } from '@env/environment';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
//
import { TableDelegatesListComponent } from '@app/components';
import { QuillModule } from 'ngx-quill';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DashboardComponent } from './';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
	declarations: [
		DashboardComponent,
		TableDelegatesListComponent
	],
	imports: [
		AccountStateModule,
		CountryStateModule,
		DelegateStateModule,
		DietStateModule,
		EmergencyStateModule,
		OfficeStateModule,
		ShoeSizeStateModule,
		ShirtSizeStateModule,
		TravelStateModule,
		// https://www.npmjs.com/package/ngx-quill
		QuillModule.forRoot({
			/**/
			modules: {
				syntax: true,
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],        // toggled buttons
					['blockquote', 'code-block'],
					[{ 'header': 1 }, { 'header': 2 }],               // custom button values
					[{ 'list': 'ordered'}, { 'list': 'bullet' }],
					[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
					[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
					[{ 'direction': 'rtl' }],                         // text direction
					[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
					[{ 'font': [] }],
					[{ 'align': [] }],
					['clean'],                                         // remove formatting button
					//['link', 'image', 'video']                         // link and image, video
				]
			}
			/**/
		}),
		NgScrollbarModule,
		NgxSkeletonLoaderModule,
		ClickTrackingModule,
		OverlayModule,
		MatTooltipModule,
		DragDropModule,
		MatSlideToggleModule,
		MatMenuModule,
		MatAutocompleteModule,
		MatTabsModule,
		MatChipsModule,
		MatSortModule,
		MatCardModule,
		MatSidenavModule,
		MatButtonToggleModule,
		MatBottomSheetModule,
		MatToolbarModule,
		MatIconModule,
		MatPaginatorModule,
		MatRadioModule,
		MatCheckboxModule,
		MatButtonModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MatDialogModule,
		MatExpansionModule,
		MatSnackBarModule,
		MatStepperModule,
		MatProgressBarModule,
		DashboardRoutingModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forRoot({}),
		EffectsModule.forRoot()
	]
})
export class DashboardModule {}
