import { Injectable } from '@angular/core';
import {  CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth : AuthService, private router : Router) { 
    
  }

  
  canActivate(route : any, state : RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user=>{
            if(user)
            {
              // console.log(state.url);
              // console.log("in guard else block true");
              return true;
            }
            else
            {
              // console.log("in guard else block");
              this.router.navigate(['/login'],{queryParams : {returnUrl : state.url}});
              return false;
            }
          }));
  }
}
