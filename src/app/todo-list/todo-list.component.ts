import { Component, OnInit } from '@angular/core';
import {ToDoListRepositoryService} from "./services/to-do-list-repository.service";
import {ToDoList} from "./classes/to-do-list";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  protected todoLists : ToDoList[];
  protected editedList : ToDoList = null;
  protected editedListInitialName : string = null;

  constructor(private todoListRepository : ToDoListRepositoryService) { }

  ngOnInit() {
    this.refreshLists();
  }

  addNewList(name : string) : void {
    this.todoListRepository.addNewList(name).subscribe(() => this.refreshLists());
  }

  removeList(id : string) : void {
    this.todoListRepository.removeList(id).subscribe(() => this.refreshLists());
  }

  editListName(editedList : ToDoList) : void {
    this.editedList = { ...editedList };
    this.editedListInitialName = editedList.name;
  }

  isCurrentlyEdited(todoList : ToDoList) : boolean {
    return this.editedList !== null && this.editedList.id === todoList.id;
  }

  updateListName(event : any) : void {
    event.stopPropagation(); //avoid panel expansion
    if(this.listNameChangedAndNotEmpty()){
      this.todoListRepository.updateListName(this.editedList.id, this.editedList.name)
        .subscribe(() => {
          this.refreshLists();
        });
    }
    this.editedList = null;
  }

  private refreshLists() : void {
    this.todoListRepository.getAllLists().subscribe(todoLists => this.todoLists = todoLists);
  }

  private listNameChangedAndNotEmpty() : boolean {
    return this.editedList.name != this.editedListInitialName && this.editedList.name != '';
  }

}
