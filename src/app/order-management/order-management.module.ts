import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';


@NgModule({
  declarations: [
    ViewOrdersComponent,
    ViewTicketsComponent,
    EditOrderComponent,
    AddTicketComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class OrderManagementModule { }
