import { query } from '@angular/animations';
import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin-service/AdminService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { appProduct } from 'src/app/models/app-product';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit, OnDestroy {
  categories$;
  products ;
  filteredProducts ;
  subscription;
  displayedColumns: string[] = ['title', 'category', 'price','update_delete'];
  form = new FormGroup({
    title   : new FormControl('', Validators.minLength(3)),
    price   : new FormControl(''),
    category: new FormControl('', Validators.minLength(3)),
    imageUrl: new FormControl('', Validators.minLength(3)),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService : AdminService,
              private formBuilder  : FormBuilder) { 
                
      this.categories$ = this.adminService.getCategories();          
      this.subscription   = this.adminService.getProducts().subscribe((data)=>
      {
        this.products = this.filteredProducts = data;
        this.filter();
        // console.log(this.products);
      });
  }
  

  deleteProduct(uid : String)
  {
    this.adminService.deleteProduct(uid);
    // console.log(this.form.value['category']);
  }
  
  filter()
  {
    // console.log(this.form.value['category']);
    this.filteredProducts = (query)?
    this.products.filter(p=>p['category'].toLowerCase().includes(this.form.value['category'].toLowerCase())):
    this.products; 
    
    this.filteredProducts = (query)?
    this.filteredProducts.filter(p=>p['title'].toLowerCase().includes(this.form.value['title'].toLowerCase())) :
    this.filteredProducts; 

    this.filteredProducts = new MatTableDataSource<appProduct>(this.filteredProducts);
    this.filteredProducts.paginator = this.paginator;

    this.filteredProducts.sort = this.sort;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title     : ['', ],
      category  : ['', ]
    },
  {updateOn: 'change'})
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

