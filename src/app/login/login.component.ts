import { Component } from '@angular/core';
import { FormBuilder,Validators, } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
// userid:;
userid !: string;

  constructor(private fb:FormBuilder,private api:BackendService,private router:Router,private messageservice:ChatService){}

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
  let userData = res.data
  console.log(this.userid)
  localStorage.setItem('username', userData.username);
  localStorage.setItem('userid', userData.userid);
  console.log(userData)
  if (res.status === 200) {
    alert("Login Success");
    console.log("login front from back");
    console.log(res.token);
    if(res.token){
      localStorage.setItem('token',res.token)
      this.router.navigate(['land',userData.userid]);
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
