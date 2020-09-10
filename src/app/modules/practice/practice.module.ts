import { PracticeRoutingModule } from './practice-roting.module';

import { NgModule } from '@angular/core';


import { SharedModule } from '../../shared/shared.module';

import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';




@NgModule({
  declarations: [
    ChildComponent,
    ParentComponent
  ],
  imports: [
    PracticeRoutingModule,
    SharedModule
  ]
})
export class PracticeModule { }
