import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventManagementRoutingModule } from './event-management-routing.module';
import { AddNewEventComponent } from './add-new-event/add-new-event.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ViewPastEventsComponent } from './view-past-events/view-past-events.component';


@NgModule({
  declarations: [
    AddNewEventComponent,
    ViewEventsComponent,
    EditEventComponent,
    ViewPastEventsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventManagementRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    })
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class EventManagementModule { }
