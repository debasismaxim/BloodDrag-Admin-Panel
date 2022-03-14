import { OverlayModule } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './_common/components/spinner/spinner.component';
import { AuthInterceptor } from './_common/guards/auth.interceptor';
import { ErrorInterceptor } from './_common/guards/error.interceptor';
import { SpinnerInterceptor } from './_common/guards/spinner.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DeleteConfirmDialogComponent } from './_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ErrorDialogComponent } from './_common/components/error-dialog/error-dialog.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    DeleteConfirmDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    OverlayModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    RecaptchaV3Module,
  ],
  providers: [DatePipe,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
