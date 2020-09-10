import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-parent',
  styleUrls: ['./parent.component.css'],
  template: `
  <div class="row" style="border:2px solid black;padding:10px 10px">
    <h1>Parent</h1>
     Message : {{message}}
     <p> Broadcast: {{broadCaseMessage}} </p>
    <app-child [fromParent]="fromParent" (messageEvent)= "receiveMessage($event)"></app-child>
  </div>
  `
})
export class ParentComponent implements OnInit {
  message: string; //  = 'Hello from Parent';
  broadCaseMessage: string;
  constructor(private dataService: DataService) { }
  fromParent = 'I am from Parent Component.';
  ngOnInit() {
    this.dataService.currentMessage.subscribe(arg => this.broadCaseMessage = arg);

  }
  receiveMessage($event) {
    this.message = $event;
  }

}
