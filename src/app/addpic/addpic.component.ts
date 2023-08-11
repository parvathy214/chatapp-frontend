import { Component,ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addpic',
  templateUrl: './addpic.component.html',
  styleUrls: ['./addpic.component.css']
})
export class AddpicComponent {


  // title ='uploadfile'
  // @ViewChild('singleInput', { static: false })
  // singleInput!: ElementRef;
  // files:any
  // learner:any


constructor(private api:BackendService,private router:Router,private location:Location){}
    files:  any;

selectfile(event:any){
  this.files = event.target.files[0]

}
addpic(){

  const formdata = new FormData();
  formdata.append('file',this.files)
  const userid = localStorage.getItem('userid');
 this.api.addpic(formdata,userid).subscribe((res:any)=>{
  console.log(res);

 })
 alert('Photo uploaded')
 this.location.back();

}



}
