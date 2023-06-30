import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent {
  
  inviteform:any;
  userdash:any;
  friend:any[] = [];
  friendsdata:any;
  friendname:any

  constructor(private chatService: BackendService,private fb:FormBuilder,private route:ActivatedRoute,
    private router :Router){
   
    this.inviteform = this.fb.group({
      name:[''],
      email :['']
     })


  }

  ngOnInit(){
    
    this.uniquelogin()
   
  }

  invite() {
    let friend = this.inviteform.value;
    let userid = this.route.snapshot.params['id'];
    console.log(friend)
    this.chatService.addfriend(friend,userid).subscribe((res: any) => {
      if (res.status === 200) {
        this.friend = [res.data];
        console.log("friend reached front from back");
        console.log(this.friend);
        alert("friend added");
      } else if (res.status ===300){
        alert("you are already friends");

      }
      else if (res.status === 500) {
        alert("not a registered user");
      } else {
        alert("friend cannot be added");
      }
    });
  }
  
  uniquelogin(){
    let userid = this.route.snapshot.params['id'];
    // console.log(userid)
    this.chatService.uniquelanding(userid).subscribe((res:any)=>{
        this. userdash = res.data;
       
    })
  }
  chathead(fid:any){
    console.log(fid)
    let userid = this.route.snapshot.params['id'];
        console.log(userid)
        this.chatService.setUserId(userid);
      this.router.navigate(['land', userid, 'chatroom', fid]);

  }
 
  
}
