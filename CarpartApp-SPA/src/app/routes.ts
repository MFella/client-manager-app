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
import { OrderListResolver } from './_resolvers/order-list.resolver';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailResolver } from './_resolvers/order-detail.resolver';
import { BasketResolver } from './_resolvers/basket.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { AddItemComponent } from './add-item/add-item.component';
import { AdminGuard } from './_guards/admin.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'products', component: ProductListComponent, resolve: {products: ProductListResolver, basket: BasketResolver}},
    {path: 'products/:id', component: ProductDetailComponent, resolve: {product: ProductDetailResolver, basket: BasketResolver}},
    {path: 'edit/:id', component: ProductEditComponent, resolve: {product: ProductDetailResolver}, canActivate: [AdminGuard]},
    {path: 'basket', component: BasketComponent, resolve: {client: ClientEditResolver, basket: BasketResolver}, canActivate: [AuthGuard]},
    {path: 'orders', component: OrderListComponent, resolve: {orders: OrderListResolver},
    runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
    {path: 'orders/:id', component: OrderDetailComponent, resolve: {order: OrderDetailResolver}, canActivate: [AuthGuard]},
    {path: 'addItem', component: AddItemComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'mydetails', component: ClientDetailComponent, resolve: {client: ClientEditResolver}, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
