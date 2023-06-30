import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {

  
  User = {
    email:""
  }
  User2 = {
    email:'',
    otp: '',
  };

  constructor(private router:Router,private _auth:BackendService,private http: HttpClient){}

  ngOnInit(): void {}

  showOTPForm = false;
  
  onSubmit(form: any) {
    this._auth.saveEmail({ "email": this.User.email }).subscribe((res: any) => {
      console.log(res);
      if (res.status === 404) {
        alert("User does not exist");
      } else if (res.status === 200) {
        localStorage.setItem("email", this.User.email);
        this.showOTPForm = true;
        this.router.navigate(['otp']);
      }
    });

  }

  Verify(form: any) {
    this._auth.checkOTP({ email: localStorage.getItem("email"), otp: this.User2.otp }).subscribe((data) => {
      if (data != null) {
        alert("Success");
        this.router.navigate(['land']);
      } else {
        alert("Failed");
      }
    });
  }

}

