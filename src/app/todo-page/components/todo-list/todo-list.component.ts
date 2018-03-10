import {Component, OnInit} from '@angular/core';
import {TodoListRepositoryService} from "./services/todo-list-repository.service";
import {TodoList} from "./classes/todo-list";
import {TodoListArrayUpdaterService} from "./services/todo-list-array-updater.service";

@Component({
  selector : 'todo-lists',
  templateUrl : './todo-list.component.html',
  styleUrls : ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  protected todoLists : TodoList[] = [];


  constructor(private todoListRepository : TodoListRepositoryService,
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
