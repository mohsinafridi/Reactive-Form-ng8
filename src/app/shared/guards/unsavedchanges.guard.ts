import { CreateEmployeeComponent } from './../../modules/employee/components/create-employee/create-employee.component';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UnsavedchangesGuard implements CanDeactivate<CreateEmployeeComponent> {
  canDeactivate(component: CreateEmployeeComponent) {
    if (component.employeeForm.dirty) {
      return confirm('Are you sure you want to continue?your changes will be lost!');
    }
    return true;
  }
}
