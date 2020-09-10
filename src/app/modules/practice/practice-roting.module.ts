import { ParentComponent } from './parent/parent.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import the components so they can be referenced in routes
import { ChildComponent } from './child/child.component';


const routes: Routes = [
  {
    path: '',  // Component less route
    children: [
      { path: '', component: ParentComponent },
      { path: 'child', component: ChildComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeRoutingModule { }
