import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmptyLayoutComponent } from './components/empty-layout/empty-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuLayoutComponent } from './components/menu-layout/menu-layout.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from '../_common/components/alert/alert.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    EmptyLayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuLayoutComponent,
    LoginComponent,
    AlertComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EmptyLayoutComponent,
    MenuLayoutComponent,
    HeaderComponent,
  ],
})
export class SharedModule { }
