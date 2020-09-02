import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-parent',
  styleUrls: ['./parent.component.css'],
  template: `

  <div class="parent-div">
  <h1>Parent</h1>
  Message : {{message}}
  <app-child (messageEvent)= "receiveMessage($event)"></app-child>
</div>`
})
export class ParentComponent implements OnInit {
  message: string; //  = 'Hello from Parent';


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(arg => this.message = arg);

  }
  receiveMessage($event) {
    this.message = $event;
  }

}
