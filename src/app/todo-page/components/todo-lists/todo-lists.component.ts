import {Component, OnInit} from '@angular/core';
import {TodoList} from "./classes/todo-list";
import {NameChangeEvent} from "../../../shared/classes/name-change-event";
import {ArrayUpdaterService} from "../../../shared/services/array-updater.service";
import {TodoListsRepositoryService} from "./services/todo-lists-repository.service";
import * as _ from "lodash";

@Component({
  selector : 'todo-lists',
  templateUrl : './todo-lists.component.html',
  styleUrls : ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit {

  public todoLists : TodoList[] = [];
  public selectedList : TodoList = null;

  constructor(private todoListRepository : TodoListsRepositoryService,
              private arrayUpdater : ArrayUpdaterService) {
  }

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
    this.todoListRepository.removeList(id).subscribe(() => {
      if(this.selectedList.id == id) {
        this.selectedList = null;
      }
      this.refreshLists()
    });
  }

  public selectList(listId : string) : void {
    this.selectedList = _.find(this.todoLists, ['id', listId]);
  }

  public isSelected(todoList : TodoList) : boolean {
    return this.selectedList === todoList;
  }

  public selectedListId() : string {
    return this.selectedList != null ? this.selectedList.id : null;
  }

  private refreshLists() : void {
    this.todoListRepository.getAllLists().subscribe(todoLists => {
      this.todoLists = this.arrayUpdater.update(this.todoLists, todoLists);
    });
  }



}
