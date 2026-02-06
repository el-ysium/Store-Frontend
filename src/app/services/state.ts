import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../types/product-type';

interface AppState {
    products: Product[];
    cart: Product[];
    loading: boolean;
    error: string | null;
}

@Injectable({ providedIn: 'root' })
export class StateService {
    private initialState: AppState = {
        products: [],
        cart: [],
        loading: false,
        error: null
    };

    private state = new BehaviorSubject<AppState>(this.initialState);

    products$ = this.state.asObservable().pipe(map(s => s.products));
    cart$ = this.state.asObservable().pipe(map(s => s.cart));
    loading$ = this.state.asObservable().pipe(map(s => s.loading));
    error$ = this.state.asObservable().pipe(map(s => s.error));

    // Immutably Update State
    setProducts(products: Product[]) {
        this.state.next({ ...this.state.value, products, loading: false, error: null });
    }

    addProduct(product: Product) {
        const products = [...this.state.value.products, product];
        this.state.next({ ...this.state.value, products });
    }

    addToCart(product: Product) {
        const cart = [...this.state.value.cart, product];
        this.state.next({ ...this.state.value, cart });
    }
    getCartValue(): Product[] {
        return this.state.value.cart;
    }

    removeFromCart(id: string | number) {
        const cart = this.state.value.cart.filter(p => p.id !== id);
        this.state.next({ ...this.state.value, cart });
    }

    setLoading(loading: boolean) {
        this.state.next({ ...this.state.value, loading });
    }

    setError(error: string | null) {
        this.state.next({ ...this.state.value, error, loading: false });
    }
}