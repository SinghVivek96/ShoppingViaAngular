import { appProduct } from "./app-product";
import { shoppingCartItem } from "./shopping-cart-items";

export class ShoppingCart{
    
    items : shoppingCartItem[]=[];
    constructor(private itemMap : {[productId: string]:  shoppingCartItem})   {
        for(let productId in itemMap)
            {
                let item = itemMap[productId];
                this.items.push(new shoppingCartItem(item.product,item.quantity));
            }
            
       }

    getQuantity(product : appProduct) //correct it.
    {   
        if(!this.itemMap) return 0;
        let item = this.itemMap[product.uid];
        if(!item) return 0;
        return this.itemMap[product.uid].quantity;
    }

    get totalPrice()
    {
        let price =0;
        for(let productId in this.items)
        {
         price += this.items[productId].totalPrice;
        }
        return price;
    }

    get totalItemsCount()
    {
        let count=0;
        for(let productId in this.items)
        {
         count += this.items[productId].quantity;
        }
        return count;
    }
}