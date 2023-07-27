import { Component,ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { io } from 'socket.io-client';
import {MatSnackBar,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';



@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']

})



export class ChatroomComponent {

  copiedMessageIndices: number[] = []; // Array to store the indices of copied messages
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

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
    private messageservice: ChatService,
    private snackBar: MatSnackBar,
    private clipboard :Clipboard
    ) {}

  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const fid = params['fid'];
      this.chatroom(fid);
      // this.fetchMessage()
    });
    this.uid =  localStorage.getItem('userid')
    // this.sendMessage();
    this.blocklist()

  }


  chatroom(fid: any) {
    console.log('chatroom function executed');
    // let userid = this.chatService.getUserId();
    // this.messageservice.setUserId(userid);
    let userid = localStorage.getItem('userid')
    console.log('userid:', userid);

    if (fid) {
      this.chatService.chatdetails(userid, fid).subscribe((res: any) => {
        this.frienddetails = res.data;
        this.receiver = this.frienddetails.username;
        console.log('Friend name:', this.frienddetails);
        console.log(this.frienddetails.username)
        this.userName =  this.frienddetails.username
        this.status = this.frienddetails.status
    this.socket = io('http://localhost:3001')
    this.messages = []

    this.userDetails.recipient = this.userName
    this.socket.emit('register', this.userDetails);
    this.socket.on('old_message', (oldMsg) => {       
      // console.log("from backend ",oldMsg);
      this.messages = oldMsg

    })
       // Listen for messages
       this.socket.on('new_message', (message) => {
        console.log(message);
        this.openSnackBar(message);
        this.messages.push(message);
        console.log(this.messages);

      });


      });
    }
    
  }
  


  // for showing notification on incoming messages
  openSnackBar(msg:any) {
    console.log('message sender is',msg.sender);
    if(msg.sender == localStorage.getItem('username')){
      return
    }else if(this.mutedUsers.includes(this.userDetails.recipient)){
      return
    }
    else{
      this.snackBar.open(`${msg.sender} : ${msg.msg}`, 'Close', {
        horizontalPosition: this.horizontalPosition,
        // verticalPosition: this.verticalPosition,
        duration: 9000
      });
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
  this.mutedUsers = this.profiledetails.mutedUsers
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


 // mute function
 muteUser(){
  console.log("muter users func")
  this.messageservice.muteUsers(this.userDetails
    ).subscribe(res=>{
    console.log(res);
    this.blocklist()

  })
}

//Unmute function
unMuteUser(){
  this.messageservice.unMuteUser(this.userDetails).subscribe(res=>{
    console.log(res);
    this.blocklist()
  })
}


ngOnDestroy() {
  if (this.socket) {
    this.socket.disconnect();
  }
}
  


copyToClipboard(message: string,index: number) {
  this.clipboard.copy(message);
  this.showPopover(index);

}
showPopover(index: number) {
  const popoverDuration = 2000; // Duration in milliseconds
  this.copiedMessageIndices.push(index); // Add the index of the copied message to the array
  setTimeout(() => {
    this.copiedMessageIndices = this.copiedMessageIndices.filter((i) => i !== index); // Remove the index from the array after the specified duration
  }, popoverDuration);
}

  }



  
