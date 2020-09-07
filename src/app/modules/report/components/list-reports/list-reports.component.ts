
import { FirebaseService } from './../../../../shared/services/firebase.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent implements OnInit {
  users: any[];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getUsers().subscribe((data) => {
      this.users = data;
    }, error => alert(error)
    );
  }

  onDelteUserClick(id: string) {
    this.firebaseService.deleteUser(id).then((result) => {
      alert('delete!');
    }).catch((err) => {
      alert('error!');
    });
  }

}
