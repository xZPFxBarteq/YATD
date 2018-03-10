import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Todo} from "../classes/todo";

@Injectable()
export class TodoRepositoryService {

  private apiUrl : string = 'https://todos.venturedevs.net/api/todos/';

  constructor(private http : HttpClient) {
  }

  public getAllTodos() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  public addNewTodo(name : string, todoListId : string) : Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, {'name' : name, 'is_complete' : false, 'todo_list' : todoListId});
  }

  public updateTodo(id : string, isComplete : boolean) : Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}${id}/`, {'is_complete' : isComplete});
  }

  public removeTodo(id : string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

}
