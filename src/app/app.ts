import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './types/product-type';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
      price: 199000.99,
      imageUrl: 'assets/headphones.jpg'
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Track your fitness, heart rate, and notifications on the go.',
      price: 249000.99,
      imageUrl: 'assets/watch.jpg'
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with tactile blue switches.',
      price: 89000.99,
      imageUrl: 'assets/keyboard.jpg'
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      description: 'High-precision 16,000 DPI optical sensor with customizable buttons.',
      price: 59000.99,
      imageUrl: 'assets/mouse.jpg'
    },
    {
      id: 5,
      name: 'Portable SSD',
      description: '1TB ultra-fast external storage for your photos and videos.',
      price: 129000.00,
      imageUrl: 'assets/flash.jpg'
    },
    {
      id: 6,
      name: 'Gamer Bag',
      description: 'Bright Orange bag for really cool gamers',
      price: 75000.25,
      imageUrl: 'assets/bag.jpg'
    }
  ];
  cart: Product[] = [];
  searchQuery: string = '';

  get filteredProducts() {
    return this.products.filter(p => 
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

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
