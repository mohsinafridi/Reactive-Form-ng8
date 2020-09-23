import { IReport } from './models/models/IReport';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = 'http://localhost:3000/reports';
  constructor(private httpClient: HttpClient) { }

  getReports(): Observable<IReport[]> {
    return this.httpClient.get<IReport[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  addReport(report: IReport): Observable<IReport> {
    return this.httpClient.post<IReport>(this.baseUrl, report, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
    .pipe(catchError(this.handleError));
}

deleteEmployee(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
}
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
