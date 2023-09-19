import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { SGlobalComponent } from './s-global/s-global.component';
import { SDeckComponent } from './s-deck/s-deck.component';

@NgModule({
  declarations: [SGlobalComponent, SDeckComponent],
  imports: [CommonModule, StatsRoutingModule],
})
export class StatsModule {}
