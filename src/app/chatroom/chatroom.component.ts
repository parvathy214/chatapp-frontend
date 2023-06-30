import { Component,EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {


 fid:any
  chatuser:any;
  friendname:any;
  arrayindex:any;
  newMessage: string = '';
  messageList: string[] = [];

  private chatDetailsSubscription: Subscription | undefined;

  constructor(private chatService: BackendService,private fb:FormBuilder,private route:ActivatedRoute,
    private router:Router){}

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
    // this.uniquelogin()
    this.chatroom()
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  // uniquelogin(){
  //   // let userid = this.route.snapshot.params['id'];
  //   let userid = this.chatService.getUserId();
  //   console.log("chatroom front")
  //   console.log(userid)
  //   this.chatService.uniquelanding(userid).subscribe((res:any)=>{
  //       this. chatuser= res.data;
      
  //   })
  // }

  
  // chatroom() {
  //   let userid = this.chatService.getUserId();
  //   console.log("chatroom function executed");
  //   console.log(userid);
  //   let fid = this.route.snapshot.params['fid']; // Access fid as a route parameter
  //   console.log(fid);
  //   if (this.chatDetailsSubscription) {
  //     this.chatDetailsSubscription.unsubscribe();
  //   }
  //   this.chatDetailsSubscription= this.chatService.chatdetails(userid, fid).subscribe((res: any) => {
  //     this.friendname = res.data;
  //     console.log(this.friendname);
  //   });
  // }
  chatroom() {
    console.log("chatroom function executed")
    let userid = this.chatService.getUserId();
    let fid = this.route.snapshot.params['fid']; // Access fid as a route parameter

    if (this.chatDetailsSubscription) {
      this.chatDetailsSubscription.unsubscribe();
    }

    this.chatDetailsSubscription = this.chatService.chatdetails(userid, fid).subscribe((res: any) => {
      this.friendname = res.data;
      console.log(this.friendname);
    });
  }
  // this.router.navigate(['land/:id'])

}