import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksRoutingModule } from './decks-routing.module';
import { DIndexComponent } from './d-index/d-index.component';
import { DAddComponent } from './d-add/d-add.component';
import { DEditComponent } from './d-edit/d-edit.component';
import { DDeleteComponent } from './d-delete/d-delete.component';
import { DDetailsComponent } from './d-details/d-details.component';
import { DTestComponent } from './d-test/d-test.component';

@NgModule({
  declarations: [
  
    DIndexComponent,
       DAddComponent,
       DEditComponent,
       DDeleteComponent,
       DDetailsComponent,
       DTestComponent
  ],
  imports: [
    CommonModule,
    DecksRoutingModule
  ]
})
export class DecksModule { }
