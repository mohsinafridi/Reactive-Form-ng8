import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from './../../../../shared/services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model: any = {};

  constructor(private fireBase: FirebaseService, private fb: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login(value: any) {
    debugger;
    this.fireBase.login(value);
  }

}
