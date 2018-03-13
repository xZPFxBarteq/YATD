import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Todo} from "../classes/todo";
import {ServerService} from "../../../../shared/services/server.service";

@Injectable()
export class TodoRepositoryService {

  private endpoint : string = 'api/todos/';
  private listsEndpoint : string = 'api/todolists/';

  constructor(private http : HttpClient,
              private server : ServerService) {
  }

  public getTodos(todoListId : string) : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.listsApiUrl()}${todoListId}`);
  }

  public addNewTodo(name : string, todoListId : string) : Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl(), {'name' : name, 'is_complete' : false, 'todo_list' : todoListId});
  }

  public updateTodo(todo : Todo) : Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl()}${todo.id}/`, todo);
  }

  public removeTodo(id : string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl()}${id}`);
  }

  private apiUrl() : string {
    return this.server.getUrl(this.endpoint);
  }

  private listsApiUrl() : string {
    return this.server.getUrl(this.listsEndpoint);
  }

}
