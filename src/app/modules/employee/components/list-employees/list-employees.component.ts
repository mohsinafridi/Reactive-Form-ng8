import { IEmployee } from '../../models/IEmployee';
import { EmployeeService } from '../../employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: IEmployee[];
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe((response: IEmployee[]) =>
        this.employees = response,
        (error) =>
          console.log(error)
      );
  }

  onEditEmployeeClick(employeeId: number) {
    this.router.navigate(['/employees/edit/', employeeId]);
  }

}
