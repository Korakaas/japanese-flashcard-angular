import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { UHeaderComponent } from './u-header/u-header.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidemenuComponent,
    UHeaderComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule
  ]
})
export class UserDashboardModule { }
