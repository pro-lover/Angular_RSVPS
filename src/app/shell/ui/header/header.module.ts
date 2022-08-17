import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ClickTrackingModule } from '@core/directives/click-tracking/click-tracking.module';
import { HeaderComponent } from './header.component';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatDialogModule,
		MatMenuModule,
		MatTooltipModule,
		ClickTrackingModule
	],
	exports: [HeaderComponent],
})
export class HeaderModule {}
