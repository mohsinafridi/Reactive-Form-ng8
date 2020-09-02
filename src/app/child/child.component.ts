import { DataService } from './../data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  styleUrls: ['./child.component.css'],
  template: `<div class="child-div">
    <h1>Child</h1>
    <p>Say {{message}}</p>
    <button (click)="sendMessage()" class="button">Send Message</button>

    <button (click)="newMessage()" class="button">New Message</button>
    </div>`

})
export class ChildComponent implements OnInit {
  // @Input() message: string;

  message: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(private dataService: DataService) { }


  sendMessage() {
    this.messageEvent.emit(this.message);
  }
  ngOnInit() {
    this.dataService.currentMessage.subscribe(arg => this.message = arg);
  }
  newMessage() {
    this.dataService.changeMessage('New Message');
  }

}
