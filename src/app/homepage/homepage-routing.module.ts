import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { ManageHomeGridComponent } from './manage-home-grid/manage-home-grid.component';
import { ManageSocialMediaComponent } from './manage-social-media/manage-social-media.component';

const routes: Routes = [
  {
    path: 'manage-social-media',
    canActivate: [AuthGuard],
    component: ManageSocialMediaComponent,
  },
  {
    path: 'manage-home-grid',
    canActivate: [AuthGuard],
    component: ManageHomeGridComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
