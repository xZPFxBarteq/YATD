import { Component, OnInit } from '@angular/core';
import {TodoListRepositoryService} from "./components/todo-list/services/todo-list-repository.service";
import {TodoList} from "./components/todo-list/classes/todo-list";
import {TodoListArrayUpdaterService} from "./components/todo-list/services/todo-list-array-updater.service";
import {NameChangeEvent} from "../shared/classes/name-change-event";

@Component({
  selector: 'todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  public todoLists : TodoList[] = [];

  constructor(private todoListRepository : TodoListRepositoryService,
              private listsUpdater : TodoListArrayUpdaterService) { }

  ngOnInit() {
    this.refreshLists();
  }

  public addNewList(name : string) : void {
    this.todoListRepository.addNewList(name).subscribe(() => this.refreshLists());
  }

  public updateListName(nameChangeEvent : NameChangeEvent) : void {
    this.todoListRepository.updateListName(nameChangeEvent.id, nameChangeEvent.name).subscribe(() => this.refreshLists());
  }

  public removeList(id : string) : void {
    this.todoListRepository.removeList(id).subscribe(() => this.refreshLists());
  }

  private refreshLists() : void {
    this.todoListRepository.getAllLists().subscribe(todoLists => {
      this.todoLists = this.listsUpdater.updateList(this.todoLists, todoLists);
    });
  }

}
