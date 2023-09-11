import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SGlobalComponent } from './s-global/s-global.component';
import { SDeckComponent } from './s-deck/s-deck.component';

const routes: Routes = [
  {
    path:'', component:SGlobalComponent,

  },
  {
    path:'deck/:id', component:SDeckComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
