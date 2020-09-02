import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  @ViewChild('myDiv', { static: false }) myDiv: ElementRef;

  constructor(public http: HttpClient) { }
  ngOnInit(): void {

    /*
      when all observables complete, provide the last
      emitted value from each as dictionary
    */

    const response1 = this.http.get('https://covid19.mathdro.id/api');
    const response2 = this.http.get('https://hplussport.com/api/products/order/price/sort/asc/');
    const response3 = this.http.get('https://covid19.mathdro.id/api');

    const result = forkJoin([response1, response2, response3]);
    result.subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })


  }

}
