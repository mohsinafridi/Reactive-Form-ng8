
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
import { MyNgxsModule } from './modules/ngxs/ngxs.module';


// NGXS - State management.\
import { NgxsModule } from '@ngxs/store';
import { TutorialState } from './shared/ngxs-store/states/tutorial.states';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

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
    EmployeeModule, ReportModule, PracticeModule, MyNgxsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      TutorialState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
     ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
