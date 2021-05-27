import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminService } from './admin/admin-service/AdminService';
import { ManageCategoryComponent } from './admin/manage-category/manage-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageProductComponent } from './admin/manage-product/manage-product.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './admin/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsService } from './products/products.service';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ShoppingServiceService } from './shopping-cart/shopping-service.service';
import { ProductQuantityComponent } from './products/product-quantity/product-quantity.component';
import { OrderService } from './services/order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProductFormComponent,
    ManageCategoryComponent,
    ManageProductComponent,
    ProductsFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      {path: ''                               , component : ProductsComponent           },
      {path: 'products'                       , component : ProductsComponent       },
      {path: 'shopping-cart'                  , component : ShoppingCartComponent   },
      {path: 'check-out'                      , component : CheckOutComponent       , canActivate : [AuthGuardService]      },
      {path: 'my/orders'                      , component : MyOrdersComponent       , canActivate : [AuthGuardService]      },
      {path: 'my/orders/:id'                  , component : OrderDetailsComponent   , canActivate : [AuthGuardService]      },
      {path: 'order-success/:id'              , component : OrderSuccessComponent   , canActivate : [AuthGuardService]      },
      {path: 'login'                          , component : LoginComponent          },
      // {path: 'admin/products'                 , component : AdminProductsComponent  , canActivate : [AuthGuardService, AdminAuthGuardService]      },
      {path: 'admin/products/manageProduct'   , component : ManageProductComponent  , canActivate : [AuthGuardService, AdminAuthGuardService]      },
      {path: 'admin/products/manageCategory'  , component : ManageCategoryComponent , canActivate : [AuthGuardService, AdminAuthGuardService]      },
      {path: 'admin/products/new'             , component : ProductFormComponent    , canActivate : [AuthGuardService, AdminAuthGuardService]      },
      {path: 'admin/products/:uid'            , component : ProductFormComponent    , canActivate : [AuthGuardService, AdminAuthGuardService]      },
      {path: 'admin/orders'                   , component : AdminOrdersComponent    , canActivate : [AuthGuardService, AdminAuthGuardService]      },
      {path: 'forgot-password'                , component:  ForgotPasswordComponent },
      {path: 'verify-email'                   , component:  VerifyEmailComponent    },
      {path: '**'                             , component:  ProductsComponent       }
      ]),
    NoopAnimationsModule
  ],
  providers: [AuthService,
              AuthGuardService,
              UserService,
              AdminAuthGuardService,
              AdminService,
              ProductsService,
              ShoppingServiceService,
              OrderService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

