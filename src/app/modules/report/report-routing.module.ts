
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import the components so they can be referenced in routes
import { AddReportComponent } from './components/add-report/add-report.component';
import { ListReportsComponent } from './components/list-reports/list-reports.component';


const routes: Routes = [
  {
    path: '',  // Component less route
    children: [
      { path: '', component: ListReportsComponent },
      { path: 'create', component: AddReportComponent },
      { path: 'edit/:id', component: AddReportComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
