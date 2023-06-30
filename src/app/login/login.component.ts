import { Component } from '@angular/core';
import { FormBuilder,Validators, } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
// userid:;
userid !: string;

  constructor(private fb:FormBuilder,private api:BackendService,private router:Router){}

  loginform =this.fb.group(
    {
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    }
  )

  get login():any{
    return this.loginform.controls;
  }

enter(){
  let value = this.loginform.value;
 this.api.userlogin(value).subscribe((res:any)=>{
  if (res.status === 200) {
    alert("Login Success");
    this.userid = res.id
    console.log("login front from back");
    console.log(this.userid)
    console.log(res.token);
    if(res.token){
      localStorage.setItem('token',res.token)
      this.router.navigate(['land',this.userid]);

    }
  } else if (res.status === 500) {
    alert("Incorrect password");
  } else if (res.status === 404) {
    alert("User does not exist");
  } else {
    alert("Login Failed");
  }
 })

}
}
