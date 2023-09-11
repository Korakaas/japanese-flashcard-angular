import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { FIndexComponent } from './f-index/f-index.component';
import { FDetailsComponent } from './f-details/f-details.component';
import { FAddComponent } from './f-add/f-add.component';
import { FEditComponent } from './f-edit/f-edit.component';
import { FDeleteComponent } from './f-delete/f-delete.component';


@NgModule({
  declarations: [
    FIndexComponent,
    FDetailsComponent,
    FAddComponent,
    FEditComponent,
    FDeleteComponent,
  ],
  imports: [
    CommonModule,
    FlashcardsRoutingModule
  ]
})
export class FlashcardsModule { }
