import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { AddNewEventComponent } from './add-new-event/add-new-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { ViewPastEventsComponent } from './view-past-events/view-past-events.component';

const routes: Routes = [
  {
    path: 'add-new-event',
    canActivate: [AuthGuard],
    component: AddNewEventComponent,
  },
  {
    path: 'view-events',
    canActivate: [AuthGuard],
    component: ViewEventsComponent,
  },
  {
    path: 'view-past-events',
    canActivate: [AuthGuard],
    component: ViewPastEventsComponent,
  },
  {
    path: 'edit-event/:eventId',
    canActivate: [AuthGuard],
    component: EditEventComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagementRoutingModule { }
