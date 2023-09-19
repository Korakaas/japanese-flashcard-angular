import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DecksComponent } from './decks/decks.component';
import { DecksDetailComponent } from './decks-detail/decks-detail.component';
import { PublicRoutingModule } from './public-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { PHeaderComponent } from './p-header/p-header.component';

@NgModule({
  declarations: [
    HomeComponent,
    DecksComponent,
    DecksDetailComponent,
    LayoutComponent,
    PHeaderComponent,
  ],
  imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
