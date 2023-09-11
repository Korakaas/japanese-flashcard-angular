import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DeckComponent } from './deck/deck.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./public/public.module').then(
    (module) => module.PublicModule
    ),
    
  }
  // {
  //   path:'login',
  //   component: LoginComponent,
  // },
  // {
  //   path:'deck',F
  //   component: DeckComponent,
  // },
  // {
  //   path:'user/decks',
  //   canActivate:[AuthGuard],
  //   component: DeckComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
