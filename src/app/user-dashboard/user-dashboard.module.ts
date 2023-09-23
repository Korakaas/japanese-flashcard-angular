import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { UHeaderComponent } from './u-header/u-header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [DashboardLayoutComponent, SidemenuComponent, UHeaderComponent, FooterComponent],
  imports: [CommonModule, UserDashboardRoutingModule],
})
export class UserDashboardModule {}
