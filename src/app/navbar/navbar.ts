import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [SearchBar],
  styleUrl: '../app.css',
})
export class Navbar {
  @Input() cartCount: number = 0;
  @Output() onSearch = new EventEmitter<string>();

  relaySearch(query: string) {
    this.onSearch.emit(query); // Passing the data up 
  }
}