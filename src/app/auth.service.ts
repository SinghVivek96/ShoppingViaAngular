import { ComponentFactoryResolver, Injectable, OnDestroy } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from  'firebase';
import * as firebase from 'firebase';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { appUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  private isLoggedIn : boolean =  false;
  //user! : User;
  userInvalid! : User;
  subscription! : Subscription;

  constructor(private userService: UserService ,public  afAuth:  AngularFireAuth, private route : ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

   login()
   {
    //  console.log("here in authentication");
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
   }

   logout()
   {
      this.afAuth.signOut().then(()=>
      {
        this.isLoggedIn = false;
        // console.log("Logged out");
      });
   }

   get appUser$() : Observable<appUser>
   {
    return this.user$
    .pipe(switchMap( (user) => 
      {
        if(user)
        {
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      }));
   }
}
