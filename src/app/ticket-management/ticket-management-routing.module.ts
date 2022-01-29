import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { ManageTicketTypeComponent } from './manage-ticket-type/manage-ticket-type.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';

const routes: Routes = [
  {
    path: 'create-ticket',
    canActivate: [AuthGuard],
    component: CreateTicketComponent,
  },
  {
    path: 'view-tickets',
    canActivate: [AuthGuard],
    component: ViewTicketsComponent,
  },
  {
    path: 'manage-ticket-types',
    canActivate: [AuthGuard],
    component: ManageTicketTypeComponent,
  },
  {
    path: 'edit-ticket/:ticketId',
    canActivate: [AuthGuard],
    component: EditTicketComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManagementRoutingModule { }
