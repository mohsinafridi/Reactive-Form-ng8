import { IEmployee } from '../../models/IEmployee';
import { EmployeeService } from '../../employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: IEmployee[];
  constructor(private employeeService: EmployeeService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    // this.employeeService.getEmployees()
    //   .subscribe((response: IEmployee[]) =>
    //     this.employees = response,
    //     (error) =>
    //       console.log(error)
    //   );
    // Using Resolver.
  //  In other words, to prefetch the data for a particular route before the component is loaded.
    this.router.data.subscribe(res => {
      this.employees = res.employees;
    });
  }

  onEditEmployeeClick(employeeId: number) {
    this.route.navigate(['/employees/edit/', employeeId]);
  }

}
