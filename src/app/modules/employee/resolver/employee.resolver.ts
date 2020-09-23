import { EmployeeService } from './../employee.service';
import { IEmployee } from './../models/IEmployee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeResolve implements Resolve<IEmployee[]> {
  constructor(private router: Router, private employeeService: EmployeeService) { }

  resolve(): Observable<IEmployee[]> {
    return this.employeeService.getEmployees()
      .pipe(
        catchError(error => {
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
