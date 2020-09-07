import { Injectable } from '@angular/core';
import { PreloadingStrategy, Router, Route } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustompreloadingService implements PreloadingStrategy {
  constructor() { }
   preload(route: Route, fn: () => Observable<any>): Observable < any > {
    if (route.data && route.data['prelaod']) {
    return fn();
  } else {
    return of(null);
  }
}
}
