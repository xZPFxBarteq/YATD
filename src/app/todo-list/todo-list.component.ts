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

  constructor(private todoListRepository : ToDoListRepositoryService,
              private listsUpdater : TodoListArrayUpdaterService) {
  }

  ngOnInit() {
    this.refreshLists();
  }

  removeList(id : string) : void {
    this.todoListRepository.removeList(id).subscribe(() => this.refreshLists());
  }

  refreshLists() : void {
    this.todoListRepository.getAllLists().subscribe(todoLists => {
      this.todoLists = this.listsUpdater.updateList(this.todoLists, todoLists);
    });
  }


}
