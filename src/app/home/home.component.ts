import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showLoginForm: boolean = true;
  showSignupForm: boolean = false;

  LoginForm() {
    this.showLoginForm = true;
    this.showSignupForm = false;
  }

  SignupForm() {
    this.showLoginForm = false;
    this.showSignupForm = true;
  }

}
