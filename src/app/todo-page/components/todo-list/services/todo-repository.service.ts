import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Todo} from "../classes/todo";
import {RepositoryService} from "../../../../shared/services/repository.service";

@Injectable()
export class TodoRepositoryService extends RepositoryService {

  private endpoint : string = 'api/todos/';
  private listsEndpoint : string = 'api/todolists/';

  public getTodos(todoListId : string) : Observable<Todo[]> {
    return this.handleCall(this.http.get<Todo[]>(`${this.listsApiUrl()}${todoListId}`));
  }

  public addNewTodo(name : string, todoListId : string) : Observable<Todo> {
    return this.handleCall(this.http.post<Todo>(this.apiUrl(), {
      'name' : name,
      'is_complete' : false,
      'todo_list' : todoListId
    }));
  }

  public updateTodo(todo : Todo) : Observable<Todo> {
    return this.handleCall(this.http.put<Todo>(`${this.apiUrl()}${todo.id}/`, todo));
  }

  public removeTodo(id : string) : Observable<void> {
    return this.handleCall(this.http.delete<void>(`${this.apiUrl()}${id}`));
  }

  private apiUrl() : string {
    return this.server.getUrl(this.endpoint);
  }

  private listsApiUrl() : string {
    return this.server.getUrl(this.listsEndpoint);
  }

}
