import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CouponsComponent } from './coupons/coupons.component';
import { EditMailContentComponent } from './edit-mail-content/edit-mail-content.component';
import { MailContentComponent } from './mail-content/mail-content.component';
import { ViewTaxesComponent } from './view-taxes/view-taxes.component';
import { HideShowComponent } from './hide-show/hide-show.component';
import { ManageStripeComponent } from './manage-stripe/manage-stripe.component';


const routes: Routes = [
  {
    path: 'view-mail-contents',
    canActivate: [AuthGuard],
    component: MailContentComponent,
  },
  {
    path: 'manage-stripe',
    canActivate: [AuthGuard],
    component: ManageStripeComponent,
  },
  {
    path: 'edit-mail-content/:mailContentId',
    canActivate: [AuthGuard],
    component: EditMailContentComponent,
  },
  {
    path: 'manage-taxes',
    canActivate: [AuthGuard],
    component: ViewTaxesComponent,
  },
  {
    path: 'manage-coupons',
    canActivate: [AuthGuard],
    component: CouponsComponent,
  },
  {
    path: 'change-password',
    canActivate: [AuthGuard],
    component: ChangePasswordComponent,
  },
  {
    path: 'manage-hide-show',
    canActivate: [AuthGuard],
    component: HideShowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
