import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditResolver } from './_resolvers/client-edit.resolver';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { BasketComponent } from './basket/basket.component';
import { ProductDetailResolver } from './_resolvers/product-detail.resolver';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'products', component: ProductListComponent, resolve: {products: ProductListResolver}},
    {path: 'products/:id', component: ProductDetailComponent, resolve: {product: ProductDetailResolver}},
    {path: 'basket', component: BasketComponent, resolve: {client: ClientEditResolver}},
    {path: 'orders', component: OrderListComponent},
    {path: 'mydetails', component: ClientDetailComponent, resolve: {client: ClientEditResolver}},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
