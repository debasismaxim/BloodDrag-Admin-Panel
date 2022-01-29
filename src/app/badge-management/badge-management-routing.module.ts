import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { CreateBadgeComponent } from './create-badge/create-badge.component';
import { EditBadgeComponent } from './edit-badge/edit-badge.component';
import { ViewBadgesComponent } from './view-badges/view-badges.component';

const routes: Routes = [
  {
    path: 'create-badge',
    canActivate: [AuthGuard],
    component: CreateBadgeComponent,
  },
  {
    path: 'edit-badge/:badgeId',
    canActivate: [AuthGuard],
    component: EditBadgeComponent,
  },
  {
    path: 'view-badges',
    canActivate: [AuthGuard],
    component: ViewBadgesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadgeManagementRoutingModule { }
