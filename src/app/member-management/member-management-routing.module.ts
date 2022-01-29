import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { AddNewMemberComponent } from './add-new-member/add-new-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { ViewMembersComponent } from './view-members/view-members.component';

const routes: Routes = [
  {
    path: 'add-new-member',
    canActivate: [AuthGuard],
    component: AddNewMemberComponent,
  },
  {
    path: 'view-members',
    canActivate: [AuthGuard],
    component: ViewMembersComponent,
  },
  {
    path: 'member-details/:memberId',
    canActivate: [AuthGuard],
    component: MemberDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit-member/:memberId',
    canActivate: [AuthGuard],
    component: EditMemberComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberManagementRoutingModule { }
