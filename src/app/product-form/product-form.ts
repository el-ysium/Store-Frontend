import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true, // explicit standalone
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {

  productForm: FormGroup;
  errorMessage: string | null = null; // Define this property

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
    
      if (file.size > 102400) {
        this.errorMessage = 'File is too large! Please select an image under 100KB.';
        this.productForm.patchValue({ imageUrl: '' }); 
        event.target.value = null; 
        return;
      }

      
      this.errorMessage = null;

      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({
          imageUrl: reader.result 
        });
        this.productForm.get('imageUrl')?.updateValueAndValidity();
      };

      reader.readAsDataURL(file); 
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      
      this.errorMessage = null; 

      this.productService.createProduct(this.productForm.value).subscribe({
        next: () => {
          alert('Product created successfully!');
          this.router.navigate(['/']);
        },

        error: (err: string) => {
          this.errorMessage = err; 
        }
      });
    }
  }
}