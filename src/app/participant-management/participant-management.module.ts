import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantManagementRoutingModule } from './participant-management-routing.module';
import { ViewParticipantsComponent } from './view-participants/view-participants.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewParticipantsComponent,
    ParticipantDetailsComponent
  ],
  imports: [
    CommonModule,
    ParticipantManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParticipantManagementModule { }
