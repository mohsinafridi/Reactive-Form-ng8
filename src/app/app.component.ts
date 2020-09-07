import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {

  }
  model: any = {};
  title = 'Reactive Form';

  loggedIn() {
    if (localStorage.getItem('user') === null) {
      return false;
    }
    return true;
  }
  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }
}
