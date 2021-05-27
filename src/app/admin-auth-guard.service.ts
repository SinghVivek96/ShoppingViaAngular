import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth : AuthService) { 
    
  }

  canActivate()
  {
    return this.auth.appUser$
      .pipe(map((appUser)=> appUser.isAdmin))
      //.pipe(map(appUsers    => appUsers.valueChanges()
      //.pipe(map(userData    => {return userData.isAdmin}))   
    //));
      
  }
    
}
