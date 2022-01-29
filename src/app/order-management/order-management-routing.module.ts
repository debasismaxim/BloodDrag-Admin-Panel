import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  {
    path: 'view-orders',
    canActivate: [AuthGuard],
    component: ViewOrdersComponent,
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
