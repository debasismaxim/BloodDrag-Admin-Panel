import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
  {
    path: 'terms-conditions',
    canActivate: [AuthGuard],
    component: TermsConditionsComponent,
  },
  {
    path: 'refund-policy',
    canActivate: [AuthGuard],
    component: RefundPolicyComponent,
  },
  {
    path: 'privacy-policy',
    canActivate: [AuthGuard],
    component: PrivacyPolicyComponent,
  },
  {
    path: 'sitemap',
    canActivate: [AuthGuard],
    component: SitemapComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
