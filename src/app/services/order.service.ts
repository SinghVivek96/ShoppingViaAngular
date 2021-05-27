import { Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingServiceService } from '../shopping-cart/shopping-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService  {
  userId: string;
  allOrders;
  customerOrders;
  items: any[] = [];

  constructor(private db : AngularFireDatabase,
             
              private shoppingCartService : ShoppingServiceService) {
             }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    localStorage.removeItem('cartId');
    return result;
  }

  getCutomerOrder() : Observable<{}>
  {
    return this.db.object('/orders').valueChanges();
  }

  getOrderDetails(orderId : string)
  {
    return this.db.object('/orders/'+orderId).valueChanges();
  }

}
