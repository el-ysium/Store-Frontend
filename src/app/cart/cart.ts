import { Component } from '@angular/core';
import { ProductService } from '../services/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html'
})
export class Cart {
  constructor(public productService: ProductService) {}

  removeItem(id: string | number) {
    this.productService.removeFromCart(id as any);
  }
}