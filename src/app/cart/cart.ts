import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html'
})
export class Cart {
  private productService = inject(ProductService);
  cart$ = this.productService.getCart();


  removeItem(id: string | number) {
    this.productService.removeFromCart(id);
  }


}