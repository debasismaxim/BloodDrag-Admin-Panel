import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyLayoutComponent } from './shared/components/empty-layout/empty-layout.component';
import { MenuLayoutComponent } from './shared/components/menu-layout/menu-layout.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: EmptyLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'dashboard',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'mm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./member-management/member-management.module').then(m => m.MemberManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'em',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./event-management/event-management.module').then(m => m.EventManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'tm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./ticket-management/ticket-management.module').then(m => m.TicketManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'pm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'participants',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./participant-management/participant-management.module').then(m => m.ParticipantManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'bm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./badge-management/badge-management.module').then(m => m.BadgeManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'cm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./content-management/content-management.module').then(m => m.ContentManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'sm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'cs',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./car-management/car-management.module').then(m => m.CarManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'om',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: 'homepage',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
    ],
    data: {
      title: 'BloodDrag Official Website',
      description: 'BloodDrag Official Website',
      keywords: 'BloodDrag Official Website'
    }
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
