import {Component, Input, OnInit} from '@angular/core';
import {TodoRepositoryService} from "./services/todo-repository.service";
import {Todo} from "./classes/todo";

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
    if (this.todoListId != '') {
      this.todoRepository.getTodos(this.todoListId).subscribe(todos => {
        this.todos = todos;
      });
    }
  }

  ngOnChanges() {
    if (this.todoListId != '') {
      this.todoRepository.getTodos(this.todoListId).subscribe(todos => {
        this.todos = todos;
      });
    }
  }

}
