import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  public searchedValue : string = '';

  constructor() { }

  ngOnInit() {
  }

  cancelSearch() : void {
    this.searchedValue = '';
  }

}
