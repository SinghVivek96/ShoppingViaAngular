import { appProduct } from "./app-product";

export class shoppingCartItem{

    constructor(public product : appProduct, public quantity : number)
    {   }

    get totalPrice(){
        return this.product.price*this.quantity;
    }
}