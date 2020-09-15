import { UnsavedchangesGuard } from './../../shared/guards/unsavedchanges.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import the components so they can be referenced in routes
import { CreateEmployeeComponent } from '../employee/components/create-employee/create-employee.component';
import { ListEmployeesComponent } from '../employee/components/list-employees/list-employees.component';

const routes: Routes = [
  {
    path: '',  // Component less route
    children: [
      { path: '', component: ListEmployeesComponent },
      { path: 'create', component: CreateEmployeeComponent, canDeactivate :[UnsavedchangesGuard] },
      { path: 'edit/:id', component: CreateEmployeeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
