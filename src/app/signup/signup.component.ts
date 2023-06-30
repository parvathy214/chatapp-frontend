import { Component,OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder,AbstractControl,AsyncValidatorFn,ValidationErrors,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  
  

 constructor(private api:BackendService ,private fb:FormBuilder,private router:Router){}
    user : any
   Signupform= this.fb.group(
    {
      name :['',[Validators.required,Validators.pattern('^[a-zA-Z]+$'),,this.usernameValidator]],
      username:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmpassword:['']
    },
    { validator: this.passwordMatchValidator },

   )

   get signup():any{
    return this.Signupform.controls;
  }



usernameValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  const username = control.value;

  return new Promise((resolve, reject) => {
    this.api.existinguser(username).subscribe(
      (res: any) => {
        if (res.message === "user already exists") {
          resolve({ 'usernameExists': true });
        } else {
          resolve(null);
        }
      },
      (error) => {
        resolve(null); // Rejecting the promise with `null` will not set the error
      }
    );
  });
}

   passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmpassword = control.get('confirmpassword');

    if (password && confirmpassword && password.value !== confirmpassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  
  Submit(){
    let value = this.Signupform.value;
    console.log(value)
  this.api.adduser(value).subscribe((res:any)=>{
    if (res.message === "user already exists"){
      alert("user already exists")
    }
    else if (res.message === "username already exists"){
      alert("username is taken");
    }
    else{
      this.router.navigate(['land/:id'])
    }
  })

  }

}


