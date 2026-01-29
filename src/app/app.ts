import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product';
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


  constructor(public productService: ProductService) { }


}
