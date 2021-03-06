import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { ManageSocialMediaComponent } from './manage-social-media/manage-social-media.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageHomeGridComponent } from './manage-home-grid/manage-home-grid.component';
import { ManageHomeBannerComponent } from './manage-home-banner/manage-home-banner.component';
import { ManageHomeSeoComponent } from './manage-home-seo/manage-home-seo.component';
import { ManageHomeSliderComponent } from './manage-home-slider/manage-home-slider.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    ManageSocialMediaComponent,
    ManageHomeGridComponent,
    ManageHomeBannerComponent,
    ManageHomeSeoComponent,
    ManageHomeSliderComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ]
})
export class HomepageModule { }
