import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { Observable ,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private userid!: string;


  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) { }  

  socket = io('http://localhost:3001');

  api ='http://localhost:3000';


  setUserId(userid: string) {
    this.userid = userid;
  }
  getUserId() {
    return this.userid;
  }
  public sendMessage(message:any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };



// add user
adduser(value:any){
  console.log("data reached service")
  return this.http.post(`${this.api}/signup`,value)
}

//existinguser
existinguser(username: string){
  return this.http.get(`${this.api}?username=${username}`)
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
return this.http.get(`${this.api}/uniquelogin/${userid}`)
}
chatdetails(userid:any,fid:any){
  console.log("reached chat head service")
  console.log(userid);
  console.log(fid);

  return this.http.get(`${this.api}/chatroom/${userid}/${fid}`)

}
}
