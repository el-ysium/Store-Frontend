import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/product-type';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  public cart: Product[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(product: Product) {
    this.cart.push(product);
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
  }

  isInCart(productId: number): boolean {
    return this.cart.some(p => p.id === productId);
  }

  private apiUrl = 'http://localhost:8000/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

}
