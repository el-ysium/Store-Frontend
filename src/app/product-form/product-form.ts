import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product';
import { CategoryService } from '../services/category';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../types/category-type';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  productForm: FormGroup;
  errorMessage: string | null = null;
  categories: Category[] = [];
  loadingCategories = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      categoryId: [null, Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required]],
      inStock: [true],
      properties: this.fb.array([this.createProperty()]),
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loadingCategories = false;
      },
      error: (err: string) => {
        this.loadingCategories = false;
        this.errorMessage = err;
      },
    });
  }

  createProperty(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  get properties() {
    return this.productForm.get('properties') as FormArray;
  }

  addProperty() {
    this.properties.push(this.createProperty());
  }

  removeProperty(index: number) {
    if (this.properties.length > 1) {
      this.properties.removeAt(index);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      if (file.size > 102400) {
        this.errorMessage = 'File is too large! Please select an image under 100KB.';
        this.productForm.patchValue({ imageUrl: '' });
        (event.target as HTMLInputElement).value = '';
        return;
      }

      this.errorMessage = null;

      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({
          imageUrl: reader.result,
        });
        this.productForm.get('imageUrl')?.updateValueAndValidity();
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.errorMessage = null;

    const { name, description, price, categoryId, stock } = this.productForm.value;

    this.productService.createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
    }).subscribe({
      next: () => {
        alert('Product created successfully!');
        this.router.navigate(['/products']);
      },
      error: (err: string) => {
        this.errorMessage = err;
      },
    });
  }
}
