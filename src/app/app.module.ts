import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { PracticeComponent } from './practice/practice.component';
import { HttpClientModule } from '@angular/common/http';
import { ChildComponent } from './child/child.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { ListEmployeesComponent } from './components/employee/list-employees/list-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    PracticeComponent,
    CreateEmployeeComponent,
    ListEmployeesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule, AppRoutingModule,
      ReactiveFormsModule,
     AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
