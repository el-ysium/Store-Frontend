import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../types/product-type';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: '../app.css',
})
export class ProductCard {
  @Input() product!: Product;
  @Input() isSelected: boolean = false;
  @Output() productSelected = new EventEmitter<Product>();

  selectCard() {
    this.productSelected.emit(this.product);
  }
}


