import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AddfriendComponent } from './addfriend/addfriend.component';

const routes: Routes = [
  {path:'',component:HomeComponent,
  children:[
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent}
]
},
  {path:'forgot',component:ForgotComponent},

  {path:'land/:id',component:LandingComponent,
   children:[
    {path:'chatroom/:fid',component:ChatroomComponent}

  ]
},
  {path:'addfriend/:id',component:AddfriendComponent},
  { path: 'chatroom', component: ChatroomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
