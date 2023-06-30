import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.css']
})
export class AddfriendComponent {


  inviteform:any;
  userdash:any;
  friend:any[] = [];
  friendsdata:any;

  constructor(private chatService: BackendService,private fb:FormBuilder,private route:ActivatedRoute,private router : Router){
   
    this.inviteform = this.fb.group({
      name:[''],
      email :['']
     })
   
    }

  // ngOnInit(){
    
  // }

  invite() {
    let friend = this.inviteform.value;
    let userid = this.route.snapshot.params['id'];
    console.log(userid)
    console.log(friend)
    this.chatService.addfriend(friend,userid).subscribe((res: any) => {
      if (res.status === 200) {
        this.friend = [res.data];
        console.log("friend reached front from back");
        console.log(this.friend);
        alert("friend added");
        this.router.navigate([`land/${userid}`]);
      } else if (res.status ===300){
        alert("you are already friends");
        this.router.navigate([`land/${userid}`]);
      }
      else if (res.status === 500) {
        alert("not a registered user");
        this.router.navigate([`land/${userid}`]);
      } else {
        alert("friend cannot be added");
        this.router.navigate([`land/${userid}`]);
      }
    });
  }

}
