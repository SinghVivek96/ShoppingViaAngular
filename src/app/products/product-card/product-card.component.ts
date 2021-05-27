import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';
import { ShoppingServiceService } from 'src/app/shopping-cart/shopping-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
  @Input('product') product;
  @Input('showActions') showActions = false;
  @Input('shopping-cart') shoppingCart;

  quantity : Number = 1;
  constructor(private cartService  : ShoppingServiceService) 
    {
    }
    
  addToCart()
  {
    this.cartService.addToCart(this.product);
  }

  ngOnInit(): void {
  }

}
