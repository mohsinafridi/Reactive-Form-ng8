import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/User';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/users';
  constructor(private httpClient: HttpClient) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
 // Save Users
  register(user: IUser): Observable<IUser> {
    debugger;
    return this.httpClient.post<IUser>(this.baseUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }




}
