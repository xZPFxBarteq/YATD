import {Todo} from "../classes/todo";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import * as _ from "lodash";

export class TodoRepositoryMock {

  private todos : Todo[] = [
    this.todo('incompleteTodo', false),
    this.todo('completeTodo', true)];


  public getTodos(todoListId : string) : Observable<Todo[]> {
    return Observable.of(this.todos);
  }

  public addNewTodo(name : string, todoListId : string) : Observable<Todo> {
    let newTodo : Todo = this.todo(name, false);
    newTodo.todo_list = todoListId;
    this.todos.push(newTodo);
    return Observable.of(newTodo);
  }

  public updateTodo(todo : Todo) : Observable<Todo> {
    let updatedTodo : Todo = _.find(this.todos, ['id', todo.id]);
    updatedTodo.is_complete = todo.is_complete;
    updatedTodo.name = todo.name;
    return Observable.of(updatedTodo);
  }

  public removeTodo(id : string) : Observable<void> {
    _.remove(this.todos, ['id', id]);
    return Observable.of(null);
  }


  private todo(name : string, complete : boolean) : Todo {
    let todo : Todo = new Todo();
    todo.id = name;
    todo.name = name;
    todo.is_complete = complete;
    return todo;
  }


}
