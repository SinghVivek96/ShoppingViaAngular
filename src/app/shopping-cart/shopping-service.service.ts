import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take , map} from 'rxjs/operators';
import { appProduct } from '../models/app-product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingServiceService {

  constructor(private db : AngularFireDatabase) { }

  private create()
  {
    console.log("in create cart id");
    return this.db.list('/shopping-carts').push({
        dateCreated : new Date().getTime()
        });
  }

  async getCart(temp: string) : Promise<Observable<ShoppingCart>>
  {
    // console.log(temp);
    // console.log("get cart");
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId)
    .valueChanges()
    .pipe(map( x => new ShoppingCart( x['items'] )))
    ;
  }

  private async getOrCreateCartId() : Promise<String>
  {
    // console.log("in get cart id");
    let cartId = localStorage.getItem('cartId'); //if cartId is not present then we will create new id
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: String, productId: String)
  {
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
  }

  async addToCart(product: appProduct)
  {
    this.updateItemQuantity(product,1);
  }

  async removeFromCart(product: appProduct)
  {
    this.updateItemQuantity(product,-1);
  }

  async clearCart()
  {
    let cartId=await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId+'/items/').remove();
  }

  private async updateItemQuantity(product: appProduct , change: number)
  {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.uid);

    item$
    .valueChanges()
    .pipe(take(1))
    .subscribe(item => {
      if (item) {
        let quantity =item['quantity'];
        if(quantity==1 && change==-1) item$.remove();
        else item$.update({quantity: item['quantity'] + change});
      }
      else item$.set({ product, quantity: 1 });
    });
  }
}
