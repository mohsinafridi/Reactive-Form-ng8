import { IUser } from './../models/User';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore: AngularFirestore, private fAuth: AngularFireAuth, private router: Router) { }


  getUsers() {
    return this.fireStore.collection('users').snapshotChanges();
  }
  createUser(user: IUser) {
    this.register(user.email, user.password);  // in authentical tab
    this.sendVerificationMail(user.email);    // send email to him
    return this.fireStore.collection('users').add(user); // in firestore.
  }
  updateUser(user: IUser) {
    delete user.id;
    this.fireStore.doc('users/' + user.id).update(user);
  }
  deleteUser(userId: string) {
    return this.fireStore.collection('users').doc(userId).delete();

    // this.fireStore.doc('users/' + userId).delete();
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail(email: string) {
    const actionCodeSettings = {
      url: 'http://localhost:4200',
      // This must be true.
      handleCodeInApp: true
    };
    debugger
    return this.fAuth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then((res) => {
        debugger
        this.router.navigate(['/employees']);
      })
      .catch((err) => console.log(err))
  }
  register(email: string, password: string) {
    this.fAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }


  login(value: any) {
    this.fAuth.signInWithEmailAndPassword(value.email, value.password).then((result) => {
      localStorage.setItem('user', result.user.email);
      this.router.navigate(['/employees']);
    }).catch((err) => {
      alert('error!');
    });
  }
  async logout() {
    await this.fAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/employees']);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  //   async  loginWithGoogle(){
  //     await  this.fAuth.signInWithPopup(new auth.GoogleAuthProvider())
  //     this.router.navigate(['admin/list']);
  // }

}
