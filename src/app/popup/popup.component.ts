import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { io } from 'socket.io-client';
import { event } from 'jquery';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  
  uid: any;
  fid: any;
  frienddetails: any;
  receiver: any = []        
  imageUrl: string | null = null;

  userName = ""              // recipient user name
  msg =                      // to send details to backend when send message function called
    {
      msg: "",               
      sender: localStorage.getItem('username'),
      receiver: "",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      image:{
        data :'' ,
        contentType :'',
      }
    }
  
    socket = io('http://localhost:3001');


  constructor(
    private chatService: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageservice: ChatService,
    ) {}

  
  

    ngOnInit(){

      this.chatroom()
    }

  chatroom() {
    let userid = localStorage.getItem('userid')
    let fid = localStorage.getItem('chatfriendid')
    console.log('userid:', userid);

    if (fid) {
      this.chatService.chatdetails(userid, fid).subscribe((res: any) => {
        this.frienddetails = res.data;
        this.receiver = this.frienddetails.username;
        console.log('Friend name:', this.frienddetails);
        console.log(this.frienddetails.username)
        this.userName =  this.frienddetails.username
    this.socket = io('http://localhost:3001')        
      });
    }
  }
  

  files:any;
  selectfile(event:any){
    this.files = event.target.files[0]
  
  }
  sendpic() {
    if (!this.files) {
      console.log('No file selected');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const base64Image = e.target.result as string;
          this.msg.image.data = base64Image;

        // Extract content type from base64 string

        const contentTypeMatches = base64Image.match(/^data:(.*);base64,/);
        if (contentTypeMatches && contentTypeMatches.length > 1) {
          this.msg.image.contentType = contentTypeMatches[1];
          
        } else {
          console.log('Error extracting content type');
        }
          // this.msg.receiver = localStorage.getItem('receiver')
                this.msg.receiver = this.userName
          this.socket.emit('send_image', this.msg);
      } else {
        console.log('Error reading image file');
      }
    };
  
    reader.readAsDataURL(this.files);
  }

}
