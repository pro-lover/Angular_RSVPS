import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
	DialogConfirmComponent,
	DialogRestoreComponent,
	DialogVersionControlComponent
} from '@app/components';
import { environment } from '@env/environment';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AdminListPage } from './';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
	/** /
	entryComponents: [
		TemplatesAddDialogComponent,
		DialogBannerContainerAddComponent,
		TemplatesAddContainerFormDialogComponent,
		DialogBannerContainerAnimationAddComponent
	],
	/**/
	declarations: [
		AdminListPage,
		DialogConfirmComponent,
		DialogRestoreComponent,
		DialogVersionControlComponent
	],
	imports: [
		CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule,
		MatMenuModule,
		MatIconModule,
		MatStepperModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCardModule,
		MatButtonModule,
		MatGridListModule,
		MatBottomSheetModule,
		MatProgressBarModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreModule.forRoot({}),
		EffectsModule.forRoot()
	],
})
export class AdminModule {}
