import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector : 'new-item',
  templateUrl : './new-item.component.html',
  styleUrls : ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  protected name : string = '';
  @Output() public onNewItemAdded : EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  public addNewItem() : void {
    this.onNewItemAdded.emit(this.name);
    this.name = '';
  }

  public nameIsEmpty() : boolean {
    return this.name == '';
  }

}
