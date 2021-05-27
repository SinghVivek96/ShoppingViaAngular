import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingServiceService } from '../shopping-cart/shopping-service.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products$;
  products;
  cart$ : Observable<ShoppingCart>;
  filteredProducts;
  selectedCategory: String;
  showActions : boolean = true;

  constructor(private productService: ProductsService,
              private route         : ActivatedRoute,
              private shoppingCart  : ShoppingServiceService) {         
  }

  filterItems(){
    this.route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category');
      this.filter();  
    })
    // console.log(this.selectedCategory);
  }

  filter()
  {
    if(this.selectedCategory) this.selectedCategory = this.selectedCategory.toLowerCase();

    if(!this.selectedCategory) this.selectedCategory = "";
    
    this.filteredProducts = (query)?
    this.products.filter(p=>p['category'].toLowerCase().includes(this.selectedCategory)):
    this.products; 
  }

  populateProducts()
  {
    this.products$.subscribe((data)=>
    {
      this.products = this.filteredProducts = data;
      this.filterItems();
    });
  }


  async ngOnInit(){ //used in ngOnIt and not in constructor because we cant use async there also it 
    this.cart$ = await this.shoppingCart.getCart("from products componenet");//will take some time to render so be patient
    this.products$   = this.productService.getProducts();
    this.populateProducts();
  }

}
