import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import {appRoutes} from './routes';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditResolver } from './_resolvers/client-edit.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ProductDetailResolver } from './_resolvers/product-detail.resolver';
import { ToPricePipe } from './basket/toPrice.pipe';
import { OrderListResolver } from './_resolvers/order-list.resolver';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailResolver } from './_resolvers/order-detail.resolver';
import { MultiplyPipe } from './order-detail/multiply.pipe';
import { BasketResolver } from './_resolvers/basket.resolver';
import { AddItemComponent } from './add-item/add-item.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export function tokeGet() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ProductListComponent,
      ProductDetailComponent,
      OrderListComponent,
      OrderDetailComponent,
      ClientDetailComponent,
      BasketComponent,
      ToPricePipe,
      MultiplyPipe,
      AddItemComponent,
      ProductEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      PaginationModule.forRoot(),
      CommonModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokeGet,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }})
   ],
   providers: [
      AuthService,
      ClientEditResolver,
      ProductListResolver,
      ProductDetailResolver,
      OrderListResolver,
      OrderDetailResolver,
      BasketResolver,
      ToPricePipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
