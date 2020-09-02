import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import the components so they can be referenced in routes
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { ListEmployeesComponent } from './components/employee/list-employees/list-employees.component';

const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
