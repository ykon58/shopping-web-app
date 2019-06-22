import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { SigninService } from '../signin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  users: Observable<any>;

  constructor(
    private db: AngularFireDatabase,
    private signinService: SigninService,
  ) {
    this.users = db.list('users').valueChanges();
  }

  ngOnInit() {}

  onSignup(form: NgForm) {
    form.value['isAdmin'] = false;
    const email = form.value.email;
    const password = form.value.password;
    this.signinService.signupUser(email, password);
    this.db.list('/users').push({Email: email,Passwod: password, isAdmin: false});
  }

}
