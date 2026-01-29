import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {


  constructor(public productService: ProductService) { }


}
