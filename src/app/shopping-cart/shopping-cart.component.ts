import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingServiceService } from './shopping-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$ : Observable<ShoppingCart>
  constructor(private cartService : ShoppingServiceService) { }

  clearCart(){
    // console.log("in clear cart");
    this.cartService.clearCart();
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart("from shopping cart");
    
  }

}
