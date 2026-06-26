import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../types/product-type';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: '../app.css',
})
export class ProductCard {

  private cart: Product[] = [];
  
  @Input() product!: Product;
  @Input() isSelected: boolean = false;
  @Output() productSelected = new EventEmitter<Product>();

  selectCard() {
    this.productSelected.emit(this.product);
  }

  get imageUrl(): string {
    return this.product.imageUrl ?? `https://picsum.photos/seed/${this.product.id}/200/300`;
  }

  get categoryName(): string {
    const { category } = this.product;
    return typeof category === 'string' ? category : category?.name ?? '';
  }
}


