import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { appProduct } from 'src/app/models/app-product';
import { AdminService } from '../admin-service/AdminService';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  saved = false;
  categories$;
  product : appProduct;
  productData ;
  id;
  uid;
  showActions: boolean = false;

  constructor(private adminService : AdminService, 
              private formBuilder  : FormBuilder,
              private route        : ActivatedRoute) { 
      this.categories$ = this.adminService.getCategories();
      this.id = this.route.snapshot.paramMap.get("uid");
      this.uid = this.id;
      if (this.uid==null) this.uid = this.uuid();
      // console.log(this.id);
      if(this.id)  
      {
        this.adminService.getProduct(this.id).subscribe(data=>{//this.adminService.getProduct(this.id).pipe(take(1)).subscribe(data=>{
          this.productData = data;
          // console.log(this.productData);
          this.form.controls.title.setValue(this.productData[3]);
          this.form.controls.price.setValue(this.productData[2]);
          this.form.controls.category.setValue(this.productData[0]);
          this.form.controls.imageUrl.setValue(this.productData[1]);
          // this.form.controls.uid.setValue(this.product[4]);  //Remove uid from here
          // console.log(this.form.controls);
          this.product = {
            uid       : this.id,
            title     : this.form.value["title"],
            price     : this.form.value["price"],
            category  : this.form.value["category"],
            imageUrl  : this.form.value["imageUrl"]};
      });
    }      
  }

  //to get form info easily 
  get f() { 
    this.product = {
      uid       : this.uid,
      title     : this.form.value["title"],
      price     : this.form.value["price"],
      category  : this.form.value["category"],
      imageUrl  : this.form.value["imageUrl"]};
      return this.form.controls; }
  
  get g()  { return this.form;  }
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  addProduct(event)
  {
    this.submitted = true;
    console.log(this.form.invalid);
    event.preventDefault();
    
    if (this.form.invalid) 
      return;
  
    this.adminService.addProduct(this.product,this.uid);
    this.saved = true;
  }

  onReset() {
    this.saved = false;
    this.submitted = false;
    this.form.reset();
}

  ngOnInit(): void {
    const reg = "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?";
    const regMinVal = '^([1-9][0-9]*[.]?[0-9]*)$';
    this.form = this.formBuilder.group({
                  title     : ['', [Validators.required,Validators.minLength(3)]],
                  price     : ['', [Validators.required,Validators.pattern(regMinVal)]],
                  category  : ['',  Validators.required],
                  imageUrl  : ['', [Validators.required, Validators.pattern(reg)]]   
    },
    {updateOn: 'blur'})
  }

  

}
