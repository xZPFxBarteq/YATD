import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Todo} from "../classes/todo";

@Injectable()
export class TodoRepositoryService {

  private apiUrl : string = 'https://todos.venturedevs.net/api/todos/';
  private todoListsApiUrl : string = 'https://todos.venturedevs.net/api/todolists/';

  constructor(private http : HttpClient) {
  }

  public getTodos(todoListId : string) : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoListsApiUrl}${todoListId}`);
  }

  public addNewTodo(name : string, todoListId : string) : Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, {'name' : name, 'is_complete' : false, 'todo_list' : todoListId});
  }

  public updateTodo(todo : Todo) : Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}${todo.id}/`, todo);
  }

  public removeTodo(id : string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

}
