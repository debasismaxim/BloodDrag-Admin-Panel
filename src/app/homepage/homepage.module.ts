import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { ManageSocialMediaComponent } from './manage-social-media/manage-social-media.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageHomeGridComponent } from './manage-home-grid/manage-home-grid.component';
import { ManageHomeBannerComponent } from './manage-home-banner/manage-home-banner.component';


@NgModule({
  declarations: [
    ManageSocialMediaComponent,
    ManageHomeGridComponent,
    ManageHomeBannerComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomepageModule { }
