import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './backend.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialdesignModule } from './materialdesign/materialdesign.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HeaderComponent } from './header/header.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AddfriendComponent } from './addfriend/addfriend.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    ForgotComponent,
    HeaderComponent,
    ChatroomComponent,
    AddfriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialdesignModule,
    ReactiveFormsModule,
    FormsModule,
  
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
