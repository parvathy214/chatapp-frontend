import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  token = localStorage.getItem('token');

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let tokenizedRequest =req.clone(
      {
        setHeaders:{
          Authorisation:'Bearer '+this.token
        }
      }
    )
    return next.handle(tokenizedRequest)
    
  }


}
