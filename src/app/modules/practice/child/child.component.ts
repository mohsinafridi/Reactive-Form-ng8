import { DataService } from '../../../data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  styleUrls: ['./child.component.css'],
  template: `<div class="row">
  <div class="col-md-6 child-div">
    <h1>Child</h1>
    <p> Broadcast: {{broadCaseMessage}} </p>
    {{fromParent}}
    <p>Say {{message}}</p>
    <div class="div-footer">
    <button (click)="sendMessageFromChild()" class="btn btn-default">Send From Child</button>
    <button (click)="broadCastToAll()" class="btn btn-danger">Broadcast</button>
  </div>
  </div>
  </div>
  `
})

export class ChildComponent implements OnInit {
  @Input() fromParent: string;
  message = 'From Child';
  broadCaseMessage: string ;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(private dataService: DataService) { }


  sendMessageFromChild() {
    this.messageEvent.emit(this.message);
  }
  ngOnInit() {
    this.dataService.currentMessage.subscribe(arg => this.broadCaseMessage = arg);
  }
  broadCastToAll() {
    debugger;
    this.dataService.changeMessage('Broadcast to All Components.');
  }

}
