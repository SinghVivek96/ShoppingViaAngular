import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from '../admin-service/AdminService';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  categories$
  
  form = new FormGroup({
    newCategory: new FormControl('', Validators.minLength(3)),
  });
    
  constructor(private adminService : AdminService) { 
    this.categories$ = this.adminService.getCategories();
  }

  deleteCategory(category : any)
  {
    // console.log("delete called");
    this.adminService.deleteCategory(category.toString());
  }

  addCategory(event)
  {

    event.preventDefault();
    var category : String = this.form.value["newCategory"];
    
    // console.log(category);
    // console.log(category.replace(/ /gi,'_'));
    let appcategory :any= category.replace(/ /gi,'_') ;
    let appcategoryName= { "name" : category} ;
    let appCategory = { [appcategory] : appcategoryName };
    this.adminService.addCategory(appCategory);
    this.form.reset();
  }


  ngOnInit(): void {
  }

}
