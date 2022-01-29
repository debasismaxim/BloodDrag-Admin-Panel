import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeManagementRoutingModule } from './badge-management-routing.module';
import { CreateBadgeComponent } from './create-badge/create-badge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBadgeComponent } from './edit-badge/edit-badge.component';
import { ViewBadgesComponent } from './view-badges/view-badges.component';


@NgModule({
  declarations: [
    CreateBadgeComponent,
    EditBadgeComponent,
    ViewBadgesComponent
  ],
  imports: [
    CommonModule,
    BadgeManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BadgeManagementModule { }
