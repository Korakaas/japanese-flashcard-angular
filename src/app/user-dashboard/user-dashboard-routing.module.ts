import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'decks',
        pathMatch: 'full',
      },
      {
        path: 'decks',
        loadChildren: () =>
          import('./decks/decks.module').then((module) => module.DecksModule),
      },
      {
        path: 'flashcards',
        loadChildren: () =>
          import('./flashcards/flashcards.module').then(
            (module) => module.FlashcardsModule
          ),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./stats/stats.module').then((module) => module.StatsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
