import { LoginGuard } from './modules/login/guards/login.guard';
import { CustompreloadingService } from './custompreloading.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { RegisterComponent } from './modules/register/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'register', component: RegisterComponent },
  {
    path: 'employees',
    data: { preload: true },
    loadChildren: './modules/employee/employee.module#EmployeeModule',
    // canActivate: [LoginGuard]
  },
  {
    path: 'reports',
    data: { preload: true },
    loadChildren: './modules/report/report.module#ReportModule',
   // canActivate: [LoginGuard]
  },
  {
path: 'practice',
loadChildren : './modules/practice/practice.module#PracticeModule'
  },

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustompreloadingService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
