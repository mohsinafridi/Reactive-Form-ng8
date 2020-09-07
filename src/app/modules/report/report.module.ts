
import { NgModule } from '@angular/core';

import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AddReportComponent } from './components/add-report/add-report.component';
import { ListReportsComponent } from './components/list-reports/list-reports.component';

@NgModule({
  declarations: [
    AddReportComponent,
    ListReportsComponent
  ],
  imports: [
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportModule { }
