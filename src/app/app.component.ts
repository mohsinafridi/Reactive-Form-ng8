import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // isLogin: boolean;
  constructor(private router: Router) {

  }
  model: any = {};
  title = 'Reactive Form';

  login() {
    this.router.navigate(['/employees']);
    localStorage.setItem('isLogin', 'true');
  }

  loggedIn() {
    if (localStorage.getItem('isLogin') === 'true') {
      return true;
    }
  }
}
