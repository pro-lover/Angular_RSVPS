import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickTrackingDirective } from './click-tracking.directive';

@NgModule({
	declarations: [ClickTrackingDirective],
	imports: [CommonModule],
	exports: [ClickTrackingDirective],
})
export class ClickTrackingModule {}
