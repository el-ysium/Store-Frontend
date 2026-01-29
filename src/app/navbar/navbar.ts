import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [RouterLink],
  styleUrl: '../app.css',
})
export class Navbar {
  @Input() cartCount: number = 0;
}