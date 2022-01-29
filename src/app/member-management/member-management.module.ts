import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberManagementRoutingModule } from './member-management-routing.module';
import { AddNewMemberComponent } from './add-new-member/add-new-member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMembersComponent } from './view-members/view-members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { EditMemberComponent } from './edit-member/edit-member.component';


@NgModule({
  declarations: [
    AddNewMemberComponent,
    ViewMembersComponent,
    MemberDetailsComponent,
    EditMemberComponent,
  ],
  imports: [
    CommonModule,
    MemberManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MemberManagementModule { }
