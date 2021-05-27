import { Component, Input, OnInit } from '@angular/core';
import { ShoppingServiceService } from 'src/app/shopping-cart/shopping-service.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product;
  @Input('shoppingCart') shoppingCart;
  
  constructor(private cartService  : ShoppingServiceService) { }

  addToCart()
  {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

}
