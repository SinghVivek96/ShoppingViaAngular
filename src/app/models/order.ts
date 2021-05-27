import { ShoppingCart } from "./shopping-cart";

export class Order{
    datePlaced : number;
    items : any[];
    
    constructor(public userId : string, 
                public shipping : any,
                       shoppingCart : ShoppingCart){
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(x=>
            {
              return {
                product  : {title       : x.product.title,
                            imageUrl    : x.product.imageUrl,
                            price       : x.product.price},
                quantity    : x.quantity,
                totalPrice  : x.totalPrice
              }
            })
    }
}