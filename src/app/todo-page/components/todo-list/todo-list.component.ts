import {Component, Input, OnInit} from '@angular/core';
import {TodoRepositoryService} from "./services/todo-repository.service";
import {Todo} from "./classes/todo";
import {NameChangeEvent} from "../../../shared/classes/name-change-event";
import * as _ from "lodash";
import {ArrayUpdaterService} from "../../../shared/services/array-updater.service";

@Component({
  selector : 'todo-list',
  templateUrl : './todo-list.component.html',
  styleUrls : ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() public todoListId : string;
  protected todos : Todo[];

  constructor(private todoRepository : TodoRepositoryService,
              private arrayUpdater : ArrayUpdaterService) {
  }

  ngOnInit() {
    this.refreshTodos();
  }

  ngOnChanges() {
    this.refreshTodos();
  }

  public addNewTodo(name : string) : void {
    this.todoRepository.addNewTodo(name, this.todoListId).subscribe(() => this.refreshTodos());
  }

  public removeTodo(id : string) : void {
    this.todoRepository.removeTodo(id).subscribe(() => this.refreshTodos());
  }

  public updateTodoName(nameChangeEvent : NameChangeEvent) : void {
    let todoToUpdate : Todo = _.find(this.todos, ['id', nameChangeEvent.id]);
    todoToUpdate.name = nameChangeEvent.name;
    this.updateTodo(todoToUpdate);
  }

  public updateTodo(todo : Todo) : void {
    this.todoRepository.updateTodo(todo).subscribe(() => this.refreshTodos());
  }

  private refreshTodos() : void {
    this.todoRepository.getTodos(this.todoListId).subscribe(todos => {
      this.todos = this.arrayUpdater.update(this.todos, todos);
    });
  }

}
