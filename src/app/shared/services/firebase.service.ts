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
    return this.fireStore.collection('users').add(user);
  }
  updateUser(user: IUser) {
    delete user.id;
    this.fireStore.doc('users/' + user.id).update(user);
  }
  deleteUser(userId: string) {
    return this.fireStore.collection('users').doc(userId).delete();

    // this.fireStore.doc('users/' + userId).delete();
  }


  async register(email: string, password: string) {
    var result = await this.fAuth.createUserWithEmailAndPassword(email, password);
  }


  login(value: any) {
    this.fAuth.signInWithEmailAndPassword(value.email, value.password).then((result) => {
      alert('bravo!');
    }).catch((err) => {
      alert('error!');
    });
  }
    async logout(){
      await this.fAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['admin/login']);
    }

    isLoggedIn(): boolean {
      const  user  =  JSON.parse(localStorage.getItem('user'));
      return  user  !==  null;
  }

  async  loginWithGoogle(){
    await  this.fAuth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['admin/list']);
}

}
