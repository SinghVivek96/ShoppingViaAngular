import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id : string;
  orderData;
  constructor(private orderService : OrderService,
              private route        : ActivatedRoute) 
  {
    this.id = this.route.snapshot.paramMap.get("id");
    // console.log(this.id);
  }

  ngOnInit(): void {
    this.orderService.getOrderDetails(this.id).subscribe(orderData => this.orderData = orderData);
  }

}
