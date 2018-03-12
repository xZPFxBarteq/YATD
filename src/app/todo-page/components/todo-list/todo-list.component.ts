import {Component, OnInit} from '@angular/core';
import {TodoList} from "./classes/todo-list";
import {NameChangeEvent} from "../../../shared/classes/name-change-event";
import {TodoListArrayUpdaterService} from "./services/todo-list-array-updater.service";
import {TodoListRepositoryService} from "./services/todo-list-repository.service";
import * as _ from "lodash";

@Component({
  selector : 'todo-lists',
  templateUrl : './todo-list.component.html',
  styleUrls : ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoLists : TodoList[] = [];
  public selectedList : TodoList = null;

  constructor(private todoListRepository : TodoListRepositoryService,
              private listsUpdater : TodoListArrayUpdaterService) {
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
    this.todoListRepository.removeList(id).subscribe(() => this.refreshLists());
  }

  public selectList(listId : string) : void {
    this.selectedList = _.find(this.todoLists, ['id', listId]);
  }

  public isSelected(todoList : TodoList) : boolean {
    return this.selectedList === todoList;
  }

  public selectedListName() : string {
    return this.selectedList != null ? this.selectedList.name : 'No list selected';
  }

  public selectedListId() : string {
    return this.selectedList != null ? this.selectedList.id : null;
  }

  private refreshLists() : void {
    this.todoListRepository.getAllLists().subscribe(todoLists => {
      this.todoLists = this.listsUpdater.updateList(this.todoLists, todoLists);
    });
  }



}
