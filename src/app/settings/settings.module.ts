import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MailContentComponent } from './mail-content/mail-content.component';
import { EditMailContentComponent } from './edit-mail-content/edit-mail-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewTaxesComponent } from './view-taxes/view-taxes.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CouponsComponent } from './coupons/coupons.component';
import { MatRadioModule } from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HideShowComponent } from './hide-show/hide-show.component';
import { ManageStripeComponent } from './manage-stripe/manage-stripe.component';


@NgModule({
  declarations: [
    MailContentComponent,
    EditMailContentComponent,
    ViewTaxesComponent,
    ChangePasswordComponent,
    CouponsComponent,
    HideShowComponent,
    ManageStripeComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule
  ]
})
export class SettingsModule { }
