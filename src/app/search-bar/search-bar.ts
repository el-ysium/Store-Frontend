import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: '../app.css',
})

export class SearchBar {
  searchQuery: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange() {
    this.searchEvent.emit(this.searchQuery);
  }

}




