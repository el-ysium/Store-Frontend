import { Component, OnInit, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { SearchBar } from '../search-bar/search-bar';
import { ProductService } from '../services/product';
import { StateService } from '../services/state';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ProductCard, SearchBar, CommonModule], templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})

export class ProductList implements OnInit {
  private stateService = inject(StateService);
  private productService = inject(ProductService);

  private searchSubject = new BehaviorSubject<string>('');

  filteredProducts = combineLatest([
    this.stateService.products$,
    this.searchSubject
  ]).pipe(
    map(([products, query]) => {
      if (!query.trim()) return products;
      const lowerQuery = query.toLowerCase();
      return products.filter(p => p.name.toLowerCase().includes(lowerQuery));
    })
  );

  loading$ = this.stateService.loading$;
  error$ = this.stateService.error$;

  constructor() { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe();
  }

  handleSearch(query: string) {
    this.searchSubject.next(query);
  }

  toggleCart(product: any) {
    const currentCart = this.stateService.getCartValue();
    const isInCart = currentCart.some(p => p.id === product.id);

    if (isInCart) {
      this.stateService.removeFromCart(product.id);
    } else {
      this.stateService.addToCart(product);
    }
  }

  isProductInCart(product: any): boolean {
    return this.stateService.getCartValue().some(p => p.id === product.id);
  }

}