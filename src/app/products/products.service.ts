import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db : AngularFireDatabase) { }

  getProducts()
  {
    return this.db.list('/products/').valueChanges();
  }

  getCart(cartId)
  {
    return this.db.list('/cartIds/'+cartId).valueChanges();
  }
  
}
