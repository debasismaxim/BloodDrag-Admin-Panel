import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentManagementRoutingModule } from './content-management-routing.module';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SitemapComponent } from './sitemap/sitemap.component';


@NgModule({
  declarations: [
    TermsConditionsComponent,
    RefundPolicyComponent,
    PrivacyPolicyComponent,
    SitemapComponent
  ],
  imports: [
    CommonModule,
    ContentManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContentManagementModule { }
