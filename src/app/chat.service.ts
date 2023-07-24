import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { Observable ,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
  private userid!: string;
  public friendid!: string;
  socket:any
  


  constructor(private http: HttpClient) {
    // this.socket = io('http://localhost:3001');
  }
  api ='http://localhost:3000';

  public setUserId(userid: string) {
    this.userid = userid;
  }

  getUserId() {
    return this.userid;
  }

 
 blockUser(data:any){
  return this.http.post(`${this.api}/block`,{data})
 }
 
 unblockUser(data:any){
  return this.http.post(`${this.api}/unblock`,{data})

 }


}



