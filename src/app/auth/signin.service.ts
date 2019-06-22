import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  
  token: string;
  userDetails: firebase.User = null;
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }
signupUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((value) => {
      this.router.navigate(['/']);
    })
  }
    
signinUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        )
      }
    )
}
    
isLoggedIn(): boolean {
    if (this.userDetails !== null) {
    return true;
  }
}
    
logout() {
  this.afAuth.auth.signOut();
  this.token = null;
}
    
getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(
    (token: string) => this.token = token
  );
    return this.token;
}
    
  isAuthenticated() {
    return this.token != null;
  }

}
