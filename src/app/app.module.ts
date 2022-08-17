import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from '@app/components';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { WebShellModule } from '@shell/web-shell.module';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { AppComponent } from './app.component';

@NgModule({
	entryComponents: [

	],
	declarations: [
		AppComponent,
		AlertComponent,

	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		WebShellModule,
		MatSnackBarModule,
		NgxGoogleAnalyticsModule.forRoot(environment.ga)
	],
	exports: [
	],
	bootstrap: [
		AppComponent
	],
})
export class AppModule {}
