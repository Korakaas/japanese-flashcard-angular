import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FIndexComponent } from './f-index/f-index.component';
import { FEditComponent } from './f-edit/f-edit.component';
import { FAddComponent } from './f-add/f-add.component';
import { FDeleteComponent } from './f-delete/f-delete.component';
import { FDetailsComponent } from './f-details/f-details.component';

const routes: Routes = [
  {
    path:'', component:FIndexComponent,

  },
  {
    path:'edit/:flashcardId', component:FEditComponent,

  },{
    path:'add', component:FAddComponent,

  },{
    path:'delete/:id', component:FDeleteComponent,

  },
  {
    path:'details/:id', component:FDetailsComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardsRoutingModule { }
