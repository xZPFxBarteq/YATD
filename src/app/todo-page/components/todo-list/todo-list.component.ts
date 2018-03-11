import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoList} from "./classes/todo-list";
import {NameChangeEvent} from "../../../shared/classes/name-change-event";
import {TodoListRepositoryService} from "./services/todo-list-repository.service";

@Component({
  selector : 'todo-lists',
  templateUrl : './todo-list.component.html',
  styleUrls : ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() public todoLists : TodoList[] = [];
  @Output() public onRemove : EventEmitter<string> = new EventEmitter<string>();
  @Output() public onNameUpdate : EventEmitter<NameChangeEvent> = new EventEmitter<NameChangeEvent>();
  public selectedListId : string = '';

  constructor() {
  }

  ngOnInit() {
  }

  public updateListName(nameChangeEvent : NameChangeEvent) {
    this.onNameUpdate.emit(nameChangeEvent);
  }

  public removeList(id : string) : void {
    this.onRemove.emit(id);
  }

  public selectList(listId : string) : void {
    this.selectedListId = listId;
  }


}
