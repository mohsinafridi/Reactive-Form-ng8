
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { RegisterComponent } from './modules/register/register/register.component';

// Custom Modules
import { EmployeeModule } from './modules/employee/employee.module';
import { ReportModule } from './modules/report/report.module';
import { PracticeModule } from './modules/practice/practice.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    EmployeeModule, ReportModule, PracticeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
