import { Component } from '@angular/core';
import { SigninService } from './auth/signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
   constructor(public signinService: SigninService){

   }
    
  logout() {
    this.signinService.logout();
  }
}

