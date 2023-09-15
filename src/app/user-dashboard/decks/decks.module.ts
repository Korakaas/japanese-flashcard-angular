import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksRoutingModule } from './decks-routing.module';
import { DIndexComponent } from './d-index/d-index.component';
import { DAddComponent } from './d-add/d-add.component';
import { DEditComponent } from './d-edit/d-edit.component';
import { DTestComponent } from './d-test/d-test.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  
    DIndexComponent,
       DAddComponent,
       DEditComponent,
       DTestComponent
  ],
  imports: [
    CommonModule,
    DecksRoutingModule,
    ReactiveFormsModule
  ]
})
export class DecksModule { }
