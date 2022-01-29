import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { ManageTicketTypeComponent } from './manage-ticket-type/manage-ticket-type.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    CreateTicketComponent,
    ViewTicketsComponent,
    EditTicketComponent,
    ManageTicketTypeComponent
  ],
  imports: [
    CommonModule,
    TicketManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ]
})
export class TicketManagementModule { }
