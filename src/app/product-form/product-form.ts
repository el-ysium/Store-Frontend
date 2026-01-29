import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule], templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required]],
      inStock: [true],
      properties: this.fb.array([this.createProperty()])
    });
  }


  createProperty(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required]

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // This runs after the file is finished being read
      reader.onload = () => {
        this.productForm.patchValue({
          imageUrl: reader.result // This is the Base64 string
        });
      };

      reader.readAsDataURL(file); // Start reading the file
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe({
        next: () => {
          alert('Product created successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error creating product', err)
      });
    }
  }
}


