import {Component, Input, OnInit} from '@angular/core';
import {TodoRepositoryService} from "./services/todo-repository.service";
import {Todo} from "./classes/todo";
import {NameChangeEvent} from "../../../shared/classes/name-change-event";

@Component({
  selector : 'todo',
  templateUrl : './todo.component.html',
  styleUrls : ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() public todoListId : string;
  protected todos : Todo[];

  constructor(private todoRepository : TodoRepositoryService) {
  }

  ngOnInit() {
    this.refreshTodos();
  }

  ngOnChanges() {
    this.refreshTodos();
  }

  public removeTodo(id : string) {
    this.todoRepository.removeTodo(id).subscribe(() => this.refreshTodos());
  }

  public updateTodoName(nameChangeEvent : NameChangeEvent) {
    // this.todoRepository.removeTodo(id).subscribe(() => this.refreshTodos());
  }

  private refreshTodos() : void {
    if (this.todoListId != '') {
      this.todoRepository.getTodos(this.todoListId).subscribe(todos => {
        this.todos = todos;
      });
    }
  }

}
