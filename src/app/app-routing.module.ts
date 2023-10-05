import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { NotFoundComponent } from './_utils/not-found/not-found.component';
import { ServerErrorComponent } from './_utils/server-error/server-error.component';
import { ForbiddenComponent } from './_utils/forbidden/forbidden.component';
import { UnavailableComponent } from './_utils/unavailable/unavailable.component';
import { TimeOutComponent } from './_utils/time-out/time-out.component';
import { ManyRequestsComponent } from './_utils/many-requests/many-requests.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((module) => module.PublicModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user-dashboard/user-dashboard.module').then(
        (module) => module.UserDashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'serverError',
    component: ServerErrorComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'unavalaible',
    component: UnavailableComponent,
  },
  {
    path: 'timeOut',
    component: TimeOutComponent,
  },
  {
    path: 'manyRequests',
    component: ManyRequestsComponent,
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
