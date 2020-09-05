import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './data.service';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
// import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { PracticeComponent } from './practice/practice.component';
import { HttpClientModule } from '@angular/common/http';
import { ChildComponent } from './child/child.component';

// Custom Modules
import { EmployeeModule } from './modules/employee/employee.module';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    PracticeComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
     EmployeeModule,
     AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
