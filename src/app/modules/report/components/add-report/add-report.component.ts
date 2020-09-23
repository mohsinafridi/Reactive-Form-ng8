import { ReportService } from './../../report.service';
import { IReport } from './../../models/models/IReport';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  constructor(private reportService: ReportService) { }
  reports: IReport[];
  submitted = false;
  reportTypes = ['Criminal', 'Robbery', 'Snaching', 'Normal'];
  model: IReport = {
    id: null,
    name: '',
    date: null,
    type: ''
  };
  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.reportService.getReports()
      .subscribe((response: IReport[]) => {
        this.reports = response;
      },
        (error) =>
          console.log(error)
      );
  }
  onSubmit(reportForm) {
    this.submitted = true;
    this.reportService.addReport(reportForm.value).subscribe((response) => {
      this.getReports();
      reportForm.reset();
    },
      (error) => {
        console.log(error);
      })

  }

  onDeleteReport(id) {
    this.reportService.deleteEmployee(id).subscribe((response) => {
      this.getReports();
    },
      (error) => {
        console.log(error);
      });
  }
}
