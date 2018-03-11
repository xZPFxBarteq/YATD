import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {TodoList} from "../../classes/todo-list";
import {TodoListRepositoryService} from "../../services/todo-list-repository.service";
import {NameChangeEvent} from "../../../../../shared/classes/name-change-event";

@Component({
  selector: 'todo-list-name',
  templateUrl: './todo-list-name.component.html',
  styleUrls: ['./todo-list-name.component.css']
})
export class TodoListNameComponent implements OnInit {

  @Input() public id : string = '';
  @Input() public name : string = '';
  @Output() public onNameUpdate = new EventEmitter<NameChangeEvent>();
  @Output() public onListClicked = new EventEmitter<string>();
  protected nameBeforeEdit : string = null;

  constructor() { }

  ngOnInit() {
  }

  editListName() : void {
    this.nameBeforeEdit = this.name;
  }

  isCurrentlyEdited() : boolean {
    return this.nameBeforeEdit !== null;
  }

  updateListName() : void {
    if (this.listNameChangedAndNotEmpty()) {
      this.onNameUpdate.emit(new NameChangeEvent(this.id, this.name));
    } else {
      this.name = this.nameBeforeEdit;
    }
    this.stopEditing();
  }

  cancelListNameEdit() : void {
    this.name = this.nameBeforeEdit;
    this.stopEditing();
  }

  @HostListener('click') onClick() : void {
    this.onListClicked.emit(this.id);
  }

  private listNameChangedAndNotEmpty() : boolean {
    return this.name != this.nameBeforeEdit && this.name != '';
  }

  private stopEditing() : void {
    this.nameBeforeEdit = null;
  }



}
