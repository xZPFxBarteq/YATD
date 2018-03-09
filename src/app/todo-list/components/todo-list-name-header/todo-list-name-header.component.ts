import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ToDoList} from "../../classes/to-do-list";
import {ToDoListRepositoryService} from "../../services/to-do-list-repository.service";

@Component({
  selector: 'todo-list-name-header',
  templateUrl: './todo-list-name-header.component.html',
  styleUrls: ['./todo-list-name-header.component.css']
})
export class TodoListNameHeaderComponent implements OnInit {

  @Input() protected toDoList : ToDoList = null;
  @Output() protected onNameUpdate = new EventEmitter<void>();
  protected listNameBeforeEdit : string = null;

  constructor(private todoListRepository : ToDoListRepositoryService) { }

  ngOnInit() {
  }

  editListName() : void {
    this.listNameBeforeEdit = this.toDoList.name;
  }

  isCurrentlyEdited() : boolean {
    return this.listNameBeforeEdit !== null;
  }

  updateListName() : void {
    if (this.listNameChangedAndNotEmpty()) {
      this.todoListRepository.updateListName(this.toDoList.id, this.toDoList.name).subscribe(() => this.onNameUpdate.emit());
    } else {
      this.toDoList.name = this.listNameBeforeEdit;
    }
    this.stopEditing();
  }

  cancelListNameEdit() : void {
    this.toDoList.name = this.listNameBeforeEdit;
    this.stopEditing();
  }

  @HostListener('click') onClick() {
    console.log("User Click using Host Listener")
  }

  private listNameChangedAndNotEmpty() : boolean {
    return this.toDoList.name != this.listNameBeforeEdit && this.toDoList.name != '';
  }

  private stopEditing() : void {
    this.listNameBeforeEdit = null;
  }



}
