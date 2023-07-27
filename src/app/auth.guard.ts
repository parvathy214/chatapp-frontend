import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isToken!:boolean
  constructor(private _router:Router,private _auth:BackendService){}



  canActivate(){
    if(this._auth.gettoken()){
      return true
    }
    else{
      this._router.navigate(['/login']);
      return false
    }

  }
  
}
