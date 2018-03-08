import {Component, OnInit} from '@angular/core';
import {ToDoListRepositoryService} from "./services/to-do-list-repository.service";
import {ToDoList} from "./classes/to-do-list";
import {TodoListArrayUpdaterService} from "./services/todo-list-array-updater.service";

@Component({
  selector : 'app-todo-list',
  templateUrl : './todo-list.component.html',
  styleUrls : ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  protected todoLists : ToDoList[] = [];
  protected newListName : string = '';
  protected editedList : ToDoList = null;
  protected editedListInitialName : string = null;

  constructor(private todoListRepository : ToDoListRepositoryService,
              private listsUpdater : TodoListArrayUpdaterService) {
  }

  ngOnInit() {
    this.refreshLists();
  }

  addNewList() : void {
    this.todoListRepository.addNewList(this.newListName).subscribe(() => {
      this.newListName = '';
      this.refreshLists()
    });
  }

  newListNameIsEmpty() : boolean {
    return this.newListName == '';
  }

  removeList(id : string) : void {
    this.todoListRepository.removeList(id).subscribe(() => this.refreshLists());
  }

  editListName(editedList : ToDoList) : void {
    if(this.editedList != null) {
      this.editedList.name = this.editedListInitialName;
    }
    this.editedList = editedList;
    this.editedListInitialName = editedList.name;
  }

  isCurrentlyEdited(todoList : ToDoList) : boolean {
    return this.editedList !== null && this.editedList.id === todoList.id;
  }

  updateListName(event : any) : void {
    event.stopPropagation(); //avoid panel expansion
    if (this.listNameChangedAndNotEmpty()) {
      this.todoListRepository.updateListName(this.editedList.id, this.editedList.name).subscribe(() => this.refreshLists());
    } else {
      this.editedList.name = this.editedListInitialName;
    }
    this.editedList = null;
    this.editedListInitialName = '';
  }

  cancelListNameEdit(event : any) : void {
    event.stopPropagation(); //avoid panel expansion
    this.editedList.name = this.editedListInitialName;
    this.editedList = null;
    this.editedListInitialName = '';
  }

  private refreshLists() : void {
    this.todoListRepository.getAllLists().subscribe(todoLists => {
      this.todoLists = this.listsUpdater.updateList(this.todoLists, todoLists);
    });
  }

  private listNameChangedAndNotEmpty() : boolean {
    return this.editedList.name != this.editedListInitialName && this.editedList.name != '';
  }

}
