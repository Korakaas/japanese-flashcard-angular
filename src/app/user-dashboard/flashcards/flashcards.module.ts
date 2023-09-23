import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { FIndexComponent } from './f-index/f-index.component';
import { FAddComponent } from './f-add/f-add.component';
import { FEditComponent } from './f-edit/f-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/pagination/pagination.module';
@NgModule({
  declarations: [FIndexComponent, FAddComponent, FEditComponent],
  imports: [CommonModule, FlashcardsRoutingModule, ReactiveFormsModule, PaginationModule],
})
export class FlashcardsModule {}
