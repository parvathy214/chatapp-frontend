import { Component,ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { io } from 'socket.io-client';
import {MatSnackBar,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import { PopupComponent } from '../popup/popup.component';



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
  chatuser: any;
  frienddetails: any;
  status:any;
  profiledetails:any
  blockedUsers: any[] = [];
  recipientBlockedUsers:any
  mutedUsers:any = []                      
  messageList: string[] = [];
  public roomId!: string;
  receiver: any = []         
  imageUrl: string | null = null;
  messageUrl: string | null = null;

  userName = ""              
  msg =                      // to send details to backend when send message function called
    {
      msg: "",               
      sender: localStorage.getItem('username'),
      receiver: "",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      image:''
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
    private clipboard :Clipboard,
    private dialog :MatDialog
    ) {}

  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const fid = params['fid'];
      this.chatroom(fid);
      this.fetchprofilepic(fid)
    });
    this.uid =  localStorage.getItem('userid')
    this.actionlist()
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
        localStorage.setItem('receiver',this.userName)
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
        console.log('new message is', message);
        let time = message.time;
        console.log(time);
        
        let image = message.image.data;
        console.log('message.image.data.data is', image);
      
        const base64Prefix = 'data:';
        if (image && image.startsWith(base64Prefix)) {
          // Extract base64 data after the prefix
          const base64Data = image.slice(image.indexOf(',') + 1); // Find the comma that separates the prefix and the actual data
          console.log('Extracted base64 data:', base64Data);
          
          const uint8Array = new Uint8Array(atob(base64Data).split('').map(char => char.charCodeAt(0)));
          const contentType = image.slice(base64Prefix.length, image.indexOf(';')); // Extract content type (e.g., 'image/jpeg', 'image/png')
          const blob = new Blob([uint8Array], { type: contentType });
          this.messageUrl = URL.createObjectURL(blob);
          console.log("message Image URL is", this.messageUrl);
          message.image = this.messageUrl;
        }
        
        console.log('message including messageurl is', message);
        this.openSnackBar(message);
        this.messages.push(message);
        console.log('messages array with each message', this.messages);
      });
      
      

      });
    }
    
  }
  


  // for showing notification of incoming messages
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

  showPopover(index: number) {
    const popoverDuration = 2000; // Duration in milliseconds
    this.copiedMessageIndices.push(index); // Add the index of the copied message to the array
    setTimeout(() => {
      this.copiedMessageIndices = this.copiedMessageIndices.filter((i) => i !== index); // Remove the index from the array after the specified duration
    }, popoverDuration);
  }




  
 // to display blocklist,mutedlist of the sender and receiver
  actionlist(){
  let userid = localStorage.getItem('userid')

  // to fetch the blocked & muted friends of the sender
  this.chatService.uniquelanding(userid).subscribe((res: any) => {      
  this.profiledetails = res.data;
  this.blockedUsers = this.profiledetails.blockedUsers || [];
  this.mutedUsers = this.profiledetails.mutedUsers                     // sender's blocked and muted friends of thr sender
  
   // to fetch the blocked  friends of the receiver
  this.route.queryParams.subscribe((params) => {
  const fid = params['fid'];   
  this.chatService.chatdetails(userid, fid).subscribe((res: any) => {   
  this.frienddetails = res.data
  this.recipientBlockedUsers = this.frienddetails.blockedUsers || [];
      })

    });
   
  });
   }


  // block function 
  blockUser(){
    this.messageservice.blockUser(this.userDetails).subscribe((res:any)=>{
        console.log(res);
        this.actionlist()

    })
  }
  unblockUser(){
    this.messageservice.unblockUser(this.userDetails).subscribe((res:any)=>{
      console.log(res);
      this.actionlist()

  })
  }


 // mute function
 muteUser(){
  console.log("muter users func")
  this.messageservice.muteUsers(this.userDetails
    ).subscribe(res=>{
    console.log(res);
    this.actionlist()

  })
}

//Unmute function
unMuteUser(){
  this.messageservice.unMuteUser(this.userDetails).subscribe(res=>{
    console.log(res);
    this.actionlist()
  })
}


ngOnDestroy() {
  if (this.socket) {
    this.socket.disconnect();
  }
}
  


//to copy message

copyToClipboard(message: string,index: number) {
  this.clipboard.copy(message);
  this.showPopover(index);

}


fetchprofilepic(fid:any) {

  let userid = localStorage.getItem('userid')
  let friendid = fid;
  this.chatService.chatdetails(userid,friendid).subscribe(
    (res: any) => {
      console.log('Base64 string fetched from back');
      let dp = res.image.data;
      const uint8Array = new Uint8Array(dp);
      const base64String = btoa(
        String.fromCharCode.apply(null, Array.from(uint8Array))
      );
      const blob = new Blob([uint8Array], { type: 'image/*' });
      this.imageUrl = URL.createObjectURL(blob);
      console.log("Image URL is", this.imageUrl);
    },
    (error) => {
      console.error('Error loading dp:', error);
    }
  );
}

openpopup(){
this.dialog.open(PopupComponent,{
  
})

}


  }



  
