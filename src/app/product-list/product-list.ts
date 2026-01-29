import { Component, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { SearchBar } from '../search-bar/search-bar';
import { ProductService } from '../services/product';
import { Product } from '../types/product-type';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, SearchBar],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  @Output() onSearch = new EventEmitter<string>();


  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    console.log('Trying to fetch products...');
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('API Error:', err)
    });
  }

  cart: Product[] = [];
  searchQuery: string = '';

  get filteredProducts() {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      return this.products;
    }

    const query = this.searchQuery.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(query)
    );
  }

  // get filteredProducts() {
  //   return this.products.filter(p =>
  //     p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // }

  handleSearch(query: string) {
    this.searchQuery = query;
  }

  toggleCart(product: Product) {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1); // Remove if already in cart
    } else {
      this.cart.push(product); // Add if not in cart
    }
  }

  isProductInCart(product: Product): boolean {
    return this.cart.some(p => p.id === product.id);
  }

}


