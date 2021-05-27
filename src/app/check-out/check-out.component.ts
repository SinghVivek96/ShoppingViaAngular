import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { ShoppingServiceService } from '../shopping-cart/shopping-service.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  form: FormGroup;
  address : {}
  cartSubscription: Subscription;
  userSubscription: Subscription;
  cart : ShoppingCart;
  userId : string;
  constructor(
              private router              : Router,
              private authService         : AuthService, 
              private formBuilder         : FormBuilder,
              private shoppingCartService : ShoppingServiceService,
              private orderService        : OrderService) { }

  get f() {
      return this.form; }

  async placeOrder(){
    let order = new Order(this.userId,{...this.form.value},this.cart);
    // console.log(order);
    let result = await this.orderService.placeOrder(order);
    if(result)
      localStorage.setItem('orderId',result.key);
    this.router.navigate(['/order-success',result.key]);
  }

  async ngOnInit(){
    this.form = this.formBuilder.group({
      name     : ['', [Validators.required,Validators.minLength(3)]],
      address1 : ['', [Validators.required,Validators.minLength(10)]],
      address2 : ['',  ],
      city     : ['', [Validators.required,Validators.minLength(3)]]   
    },
  {updateOn: 'blur'});

  let cart$ = await this.shoppingCartService.getCart("from check out");
  
  this.cartSubscription = cart$.subscribe(data=>this.cart = data);  
  this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

}
