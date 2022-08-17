import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AccountStateModule } from '@core/state/account/accounts-state.module';
import { ShirtSizeStateModule } from '@core/state/shirtsize/shirtsize-state.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ShirtSizesAddEditPage, ShortSizesListPage } from './';


@NgModule({
	declarations: [
		ShortSizesListPage,
		ShirtSizesAddEditPage
	],
	imports: [
		ShirtSizeStateModule,
		AccountStateModule,
		NgxSkeletonLoaderModule,
		RouterModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatDialogModule,
		MatExpansionModule,
		MatSortModule,
		MatMenuModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatToolbarModule,
		MatTableModule,
		MatIconModule,
		MatPaginatorModule,
		MatButtonToggleModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCardModule,
		MatButtonModule,
		MatBottomSheetModule,
		MatProgressBarModule
	],
	providers: [
		MatDatepickerModule,
		MatNativeDateModule
	]
})
export class AdminShirtSizesModule {}
