import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {TodoList} from "../../classes/todo-list";
import {TodoListRepositoryService} from "../../services/todo-list-repository.service";

@Component({
  selector: 'todo-list-name',
  templateUrl: './todo-list-name.component.html',
  styleUrls: ['./todo-list-name.component.css']
})
export class TodoListNameComponent implements OnInit {

  @Input() public todoList : TodoList = null;
  @Output() public onNameUpdate = new EventEmitter<void>();
  @Output() public onListClicked = new EventEmitter<TodoList>();
  protected listNameBeforeEdit : string = null;

  constructor(private todoListRepository : TodoListRepositoryService) { }

  ngOnInit() {
  }

  editListName() : void {
    this.listNameBeforeEdit = this.todoList.name;
  }

  isCurrentlyEdited() : boolean {
    return this.listNameBeforeEdit !== null;
  }

  updateListName() : void {
    if (this.listNameChangedAndNotEmpty()) {
      this.todoListRepository.updateListName(this.todoList.id, this.todoList.name).subscribe(() => this.onNameUpdate.emit());
    } else {
      this.todoList.name = this.listNameBeforeEdit;
    }
    this.stopEditing();
  }

  cancelListNameEdit() : void {
    this.todoList.name = this.listNameBeforeEdit;
    this.stopEditing();
  }

  @HostListener('clickButton') onClick() : void {
    this.onListClicked.emit(this.todoList);
  }

  private listNameChangedAndNotEmpty() : boolean {
    return this.todoList.name != this.listNameBeforeEdit && this.todoList.name != '';
  }

  private stopEditing() : void {
    this.listNameBeforeEdit = null;
  }



}
