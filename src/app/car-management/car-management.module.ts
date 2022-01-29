import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarManagementRoutingModule } from './car-management-routing.module';
import { ManageMakeComponent } from './manage-make/manage-make.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ManageModelComponent } from './manage-model/manage-model.component';


@NgModule({
  declarations: [
    ManageMakeComponent,
    ManageModelComponent
  ],
  imports: [
    CommonModule,
    CarManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule
  ]
})
export class CarManagementModule { }
