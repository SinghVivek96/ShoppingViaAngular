import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { appUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingServiceService } from '../shopping-cart/shopping-service.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  {
  appUser : appUser;
  totalProductsInCart:Number=0;
  cart$ : Observable<ShoppingCart>; 
  constructor(private auth : AuthService,
              private cartService : ShoppingServiceService) {

  }

  logout()
  {
    this.auth.logout();
  }

  login(){
    this.auth.login();
  }

  async ngOnInit()
  {
    this.auth.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getCart("from navbar");
  }

}
