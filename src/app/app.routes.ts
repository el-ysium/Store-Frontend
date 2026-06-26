import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { Cart } from './cart/cart';
import { NotFound } from './not-found/not-found';
import { ProductForm } from './product-form/product-form';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'products', component: ProductList, canActivate: [authGuard] },
    { path: 'products/new', component: ProductForm, canActivate: [authGuard] },
    { path: 'product/:id', component: ProductDetail, canActivate: [authGuard] },
    { path: 'cart', component: Cart, canActivate: [authGuard] },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', component: NotFound },
];