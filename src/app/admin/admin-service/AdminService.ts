import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { appCategory } from 'src/app/models/app-category';
import { of} from 'rxjs';
import { appProduct } from 'src/app/models/app-product';
import { ProductFormComponent } from '../product-form/product-form.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private db : AngularFireDatabase) { 
    
  }

  deleteCategory(category : String)
  {
    let categories = category.replace(/ /gi,'_');
    this.db.object('/categories/'+categories).remove();
  }

  addCategory(category : any)
  {
    this.db.object('/categories/').update(category);
  }

  getCategories()
  {
    return this.db.list('/categories/', ref => ref.orderByChild('name')).valueChanges();
  }

  addProduct(product : appProduct, uid: String)
  {
    this.db.object('/products/'+uid).update(product).then((data) =>{
    })
      
  } 

  getProducts()
  {
    return this.db.list('/products/').valueChanges();
  }

  getProduct(uid: String)
  {
    return this.db.list('/products/'+uid).valueChanges();
  }

  deleteProduct(uid : String)
  {
    this.db.object('/products/'+uid).remove();
  }
  
}
