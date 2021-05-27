import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin-service/AdminService';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  @Input('selectedCategory') selectedCategory;
  constructor(private adminService  : AdminService) { 
              this.categories$ = this.adminService.getCategories();
              }

  ngOnInit(): void {
  }

}
