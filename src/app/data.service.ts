import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
   private messageSource = new BehaviorSubject('Default Message');
 // private messageSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();


  changeMessage(message: string) {
       this.messageSource.next(message);
  }

}
