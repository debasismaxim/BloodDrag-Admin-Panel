import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { ViewParticipantsComponent } from './view-participants/view-participants.component';

const routes: Routes = [
  {
    path: 'view-participants',
    canActivate: [AuthGuard],
    component: ViewParticipantsComponent,
  },{
    path: 'participant-details',
    canActivate: [AuthGuard],
    component: ParticipantDetailsComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantManagementRoutingModule { }
