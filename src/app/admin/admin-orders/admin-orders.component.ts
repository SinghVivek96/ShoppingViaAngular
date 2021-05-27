import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  customerOrders : any[]=[];
  constructor(private orderService : OrderService) { }

  async ngOnInit(){
    this.orderService.getCutomerOrder().subscribe(allOrders => {
      console.log(allOrders);
      this.customerOrders=[];
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
      // console.log(this.customerOrders);
    });
  }
}
