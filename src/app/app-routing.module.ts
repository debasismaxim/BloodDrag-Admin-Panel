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
    ]
  },
  {
    path: 'dashboard',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  {
    path: 'mm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./member-management/member-management.module').then(m => m.MemberManagementModule) },
    ]
  },
  {
    path: 'em',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./event-management/event-management.module').then(m => m.EventManagementModule) },
    ]
  },
  {
    path: 'tm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./ticket-management/ticket-management.module').then(m => m.TicketManagementModule) },
    ]
  },
  {
    path: 'pm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule) },
    ]
  },
  {
    path: 'participants',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./participant-management/participant-management.module').then(m => m.ParticipantManagementModule) },
    ]
  },
  {
    path: 'bm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./badge-management/badge-management.module').then(m => m.BadgeManagementModule) },
    ]
  },
  {
    path: 'cm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./content-management/content-management.module').then(m => m.ContentManagementModule) },
    ]
  },
  {
    path: 'sm',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
    ]
  },
  {
    path: 'cs',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./car-management/car-management.module').then(m => m.CarManagementModule) },
    ]
  },
  {
    path: 'om',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule) },
    ]
  },
  {
    path: 'homepage',
    component: MenuLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
    ]
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
