import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  categoryFromUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    const categoryUrl = this.route.snapshot.queryParamMap.get('category');

    if (id) {
      this.productService.getProductsById(id).subscribe({
        next: (data) => {
          this.product = data;

          if (this.product && categoryUrl) {
            this.product.category = categoryUrl;
          }
          console.log(data);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error fetching product:', err)
      });
    }
  }


}