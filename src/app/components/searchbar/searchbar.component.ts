import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement
    this.searchQuery.emit(target.value);
  }
  
  onClear() {
    this.clearSearch.emit();
  }
  
}
