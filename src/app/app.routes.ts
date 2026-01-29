import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { Cart } from './cart/cart';
import { NotFound } from './not-found/not-found';
import { ProductForm } from './product-form/product-form';

export const routes: Routes = [
    { path: 'products', component: ProductList },
    { path: 'product/:id', component: ProductDetail },
    { path: 'products/new', component: ProductForm },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'cart', component: Cart },
    { path: '**', component: NotFound }
];