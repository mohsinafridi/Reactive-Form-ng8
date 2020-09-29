import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',  // Component less route
    children: [
      { path: '', component: CreateComponent  },
      { path: 'create', component: CreateComponent },
      // { path: 'read', component: ReadComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxsRoutingModule { }
