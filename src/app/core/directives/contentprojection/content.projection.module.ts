import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { appContentProjectionDirective } from './content.projection.directive';

@NgModule({
	declarations: [appContentProjectionDirective],
	imports: [CommonModule, MatPaginatorModule, MatProgressBarModule],
	exports: [appContentProjectionDirective],
})
export class ContentProjectionModule {}
