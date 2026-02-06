import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../types/product-type';
import { ErrorHandlerService } from './error-handler';
import { StateService } from './state';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/products';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private state: StateService
  ) { }

  // 1. UPDATED: No more local cart array. Using StateService for everything.
  addToCart(product: Product) {
    this.state.addToCart(product);
  }

  removeFromCart(id: string | number): void {
    this.state.removeFromCart(id);
  }

  isInCart(id: string | number): boolean {
    return this.state.getCartValue().some(p => p.id == id);
  }

  getCart() {
    return this.state.cart$;
  }

  getAllProducts() {
    this.state.setLoading(true);
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(prods => this.state.setProducts(prods)),
      catchError(err => {
        // 1. Get the string string from the service
        const errorMessage = this.errorHandler.handleError(err);

        // 2. Now this is a real string, so no more [object Object]!
        this.state.setError(errorMessage);

        // 3. We re-throw it here so the Component still knows something went wrong
        return throwError(() => errorMessage);
      })
    );
  }

  // Update getProductsById and createProduct similarly:
  createProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProd => this.state.addProduct(newProd)),
      catchError(err => {
        const errorMessage = this.errorHandler.handleError(err);
        return throwError(() => errorMessage);
      })
    );
  }

  getProductsById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        const errorMessage = this.errorHandler.handleError(err);
        return throwError(() => errorMessage);
      })
    );
  }
}