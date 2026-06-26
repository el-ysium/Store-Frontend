import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product';
import { Product } from '../types/product-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) { }

  get imageUrl(): string {
    if (!this.product) return '';
    return this.product.imageUrl ?? `https://picsum.photos/seed/${this.product.id}/200/300`;
  }

  get categoryName(): string {
    if (!this.product?.category) return '';
    return typeof this.product.category === 'string'
      ? this.product.category
      : this.product.category.name;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductsById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
            if (err.toString().toLowerCase().includes('not found')) {
                this.router.navigate(['/404']);
            } else {
                this.errorMessage = err;
            }
        }
      });
    }
  }
}