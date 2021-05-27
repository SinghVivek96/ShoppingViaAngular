import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  allOrders$;
  customerOrders$;
  userId : string;
  customerOrders : any[]=[];
  userSubscription : Subscription;
  url : string;
  @Input('admin') admin = false;
  constructor(private orderService : OrderService,
              private authService  : AuthService,
              private router       : Router ) {
               this.url = this.router.url;
               }

  async ngOnInit(){
    this.userSubscription = await this.authService.user$.subscribe(user => this.userId = user.uid);  
    this.orderService.getCutomerOrder().subscribe(allOrders => {
      this.customerOrders=[];
      if(this.url=="/my/orders"){
        for(let key in allOrders)
        {
          if(this.userId && this.userId == allOrders[key].userId)
          {
              this.customerOrders.push(
              {
                orderId      : key,
                dateCreated  : allOrders[key].datePlaced,
                orderingUser : allOrders[key].shipping.name,
                items        : allOrders[key].items 
              }
            );
          }
        }
      }
      else
      {
        for(let key in allOrders)
        {
         this.customerOrders.push(
            {
              orderId      : key,
              dateCreated  : allOrders[key].datePlaced,
              orderingUser : allOrders[key].shipping.name,
              items        : allOrders[key].items 
            }
          );
        }
      }

      // console.log(this.customerOrders);
    });
    
  }

  async ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
