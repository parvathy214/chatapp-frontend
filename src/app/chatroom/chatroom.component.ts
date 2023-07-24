import { Component,ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})

export class ChatroomComponent {

  uid: any;
  fid: any;
  realid:any;
  chatuser: any;
  frienddetails: any;
  status:any;
  profiledetails:any
  blockedUsers: any[] = [];
  recipientBlockedUsers:any
  mutedUsers:any = []                      
  messageList: string[] = [];
  public roomId!: string;
  receiver: any = []         // to receive data coming from backend
  
  userName = ""              // recipient user name
  msg =                      // to send details to backend when send message function called
    {
      msg: "",               
      sender: localStorage.getItem('username'),
      receiver: ""
    }


    messages: any = []         // array to store messages coming from backend
    newMessage = '';           // variable to store new messages when send button clicked
  
    socket = io('http://localhost:3001');
  

    userDetails = {                         // to send sender and recipient names to backend for creating chat rooms 
      sender: localStorage.getItem('username'),
      recipient: ""
    }
    value:any


  constructor(
    private chatService: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageservice: ChatService
  ) {}

  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const fid = params['fid'];
      this.chatroom(fid);
      // this.fetchMessage()
    });
 this.uid =  localStorage.getItem('userid')
 this.blocklist()

  }

  chatroom(fid: any) {
    console.log('chatroom function executed');
    let userid = localStorage.getItem('userid');
    console.log('userid:', userid);
  
    if (fid) {
      this.chatService.chatdetails(userid, fid).subscribe((res: any) => {
        this.frienddetails = res.data;
        this.receiver = this.frienddetails.username;
        console.log('Friend name:', this.frienddetails);
        console.log(this.frienddetails.username);
        this.userName = this.frienddetails.username;
        this.status = this.frienddetails.status;
  
        this.socket = io('http://localhost:3001');
        this.messages = [];
  
        this.userDetails.recipient = this.userName;
        this.socket.emit('register', this.userDetails);
        this.socket.on('old_message', (oldMsg) => {
          this.messages = oldMsg;
        });
         
        
      });
      //  Listen for messages
       this.socket.on('new_message', (message) => {
        console.log(message)
        this.messages.push(message)
        console.log(this.messages);

      });
    }
  }
  
  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }


 
  sendMessage() {
 
    if(this.newMessage != ""){
      this.msg.msg = this.newMessage
      this.msg.receiver = this.userName
      this.socket.emit('send_message', this.msg );
      this.newMessage = '' 
    }
   

  }

 
  blocklist(){
  let userid = localStorage.getItem('userid')
  this.chatService.uniquelanding(userid).subscribe((res: any) => {
  this.profiledetails = res.data;
  console.log('logineduser profile details', this.profiledetails);
  this.blockedUsers = this.profiledetails.blockedUsers || [];
  this.route.queryParams.subscribe((params) => {
  const fid = params['fid'];   
  console.log('blocklist fid is ',fid)
  let userid = localStorage.getItem('userid')
  this.chatService.chatdetails(userid, fid).subscribe((res: any) => {
  this.frienddetails = res.data
  console.log('logineduser friend details', this.frienddetails);
  this.recipientBlockedUsers = this.frienddetails.blockedUsers || [];
      })

    });
   
  });
   }


  // block function 
  blockUser(){
    this.messageservice.blockUser(this.userDetails).subscribe((res:any)=>{
        console.log(res);
        this.blocklist()

    })
  }
  unblockUser(){
    this.messageservice.unblockUser(this.userDetails).subscribe((res:any)=>{
      console.log(res);
      this.blocklist()

  })
  }
  
  }



  
