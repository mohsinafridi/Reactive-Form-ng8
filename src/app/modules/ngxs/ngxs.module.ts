import { NgModule } from '@angular/core';
import { NgxsRoutingModule } from './ngxs-routing.module';

// components
import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CreateComponent , ReadComponent
  ],
  imports: [
    NgxsRoutingModule,
    SharedModule
  ]
})
export class MyNgxsModule { }
