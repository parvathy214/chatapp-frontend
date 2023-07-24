import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private friends!: string;


  constructor(private http: HttpClient) { }  


  api ='http://localhost:3000';

   


  setfriends(friends:any) {
    this.friends= friends;
    console.log('service fis is :',friends)

  }
  getfriends() {
    console.log('get friens func',this.friends)

    return this.friends;
  }
  



// add user
adduser(value:any){
  console.log("data reached service")
  return this.http.post(`${this.api}/signup`,value)
}

//existingusername
existinguser(value:any){
  console.log(value)

  return this.http.get(`${this.api}/username/${value}`)
}
//userlogin
userlogin(value:any){
  return this.http.post(`${this.api}/login`,value)
}
saveEmail(email:any){
  console.log(email)
  return this.http.post(`${this.api}/email`,email)
}
checkOTP(otp:any){
  return this.http.post(`${this.api}/otp`,otp)
}

addfriend(value:any,id:any){
  console.log(value)
   return this.http.post(`${this.api}/friend/${id}`,value)
}

displayfriends(){
 return this.http.get(`${this.api}/friendslist`)
}
uniquelanding(userid:any){
  console.log('reached uniq service for loggie=ned user',userid)
return this.http.get(`${this.api}/uniquelogin/${userid}`)
}
 chatdetails(userid:any,fid:any){
  console.log("reached chat head service")
  console.log(userid);
  console.log(fid);

  return this.http.get(`${this.api}/chatroom/${userid}/${fid}`)

}

userlogout(userid:any){
  console.log("reached log out service")

  return this.http.get(`${this.api}/logout/${userid}`)
  
}

onlinestatus(friendname:any){
  console.log("reached online service")
  console.log(friendname)
  const username=friendname.username
  console.log(username)

  return this.http.get(`${this.api}/active/${username}`)


}




}
