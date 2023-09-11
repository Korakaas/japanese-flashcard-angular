import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DIndexComponent } from './d-index/d-index.component';
import { DEditComponent } from './d-edit/d-edit.component';
import { DAddComponent } from './d-add/d-add.component';
import { DDeleteComponent } from './d-delete/d-delete.component';
import { DDetailsComponent } from './d-details/d-details.component';
import { DTestComponent } from './d-test/d-test.component';

const routes: Routes = [
  {
    path:'', component:DIndexComponent,

  },
  {
    path:'edit/:id', component:DEditComponent,

  },{
    path:'add', component:DAddComponent,

  },{
    path:'delete/:id', component:DDeleteComponent,

  },
  {
    path:'details/:id', component:DDetailsComponent,

  },
  {
    path:'test/:id', component:DTestComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule { }
