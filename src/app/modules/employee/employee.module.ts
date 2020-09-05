import { NgModule } from '@angular/core';


import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent

  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule,
  ]
})
export class EmployeeModule { }
