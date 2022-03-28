import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';

const routes: Routes = [
  {
    path: 'view-orders',
    canActivate: [AuthGuard],
    component: ViewOrdersComponent,
  },
  {
    path: 'view-tickets',
    canActivate: [AuthGuard],
    component: ViewTicketsComponent,
  },
  {
    path: 'add-ticket',
    canActivate: [AuthGuard],
    component: AddTicketComponent,
  },
  {
    path: 'edit-ticket/:id',
    canActivate: [AuthGuard],
    component: AddTicketComponent,
  },
  {
    path: 'edit-order/:orderId',
    canActivate: [AuthGuard],
    component: EditOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
