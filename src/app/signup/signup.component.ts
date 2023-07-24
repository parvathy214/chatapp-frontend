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
      name :['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
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
  value = ''
  error:any
   usernameval(event:any){
    this.value = event.target.value ;
    // console.log(this.value)
    this.api.existinguser(this.value).subscribe((res:any)=>{
      if(res.message === "username taken"){
        let message = "username already taken"
        console.log(message)
        // this.error = true;
        this.Signupform.get('username')?.setErrors({ 'usernameExists': true });
      }
      else {
        this.Signupform.get('username')?.setErrors(null); 
      }
    })
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
      alert("signup success!!! please login")
      this.router.navigate([''])
    }
  })

  }

}


