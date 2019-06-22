import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Observable } from 'rxjs'

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  token: string;
  userDetails: firebase.User = null;
  user: Observable<firebase.User>;
  public currentUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

   signupUser(email: string, password: string) {
      this.afAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then((value) => {
          console.log('Success!', value);
          this.router.navigate(['/']);
        })
        .catch(error => console.log('error'));
    }

  signinUser(email:string,password:string) {
    this.afAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          )
        }
      )
    .catch(
      error => console.log(error)
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.token = null;
    this.router.navigate(['/products'])
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
