import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { ManageMakeComponent } from './manage-make/manage-make.component';
import { ManageModelComponent } from './manage-model/manage-model.component';

const routes: Routes = [
  {
    path: 'manage-make',
    canActivate: [AuthGuard],
    component: ManageMakeComponent,
  },
  {
    path: 'manage-model',
    canActivate: [AuthGuard],
    component: ManageModelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarManagementRoutingModule { }
