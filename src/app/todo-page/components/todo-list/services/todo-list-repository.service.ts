import {Injectable} from '@angular/core';
import {TodoList} from "../classes/todo-list";
import {Observable} from "rxjs/Observable";
import {RepositoryService} from "../../../../shared/services/repository.service";

@Injectable()
export class TodoListRepositoryService extends RepositoryService {

  private endpoint : string = 'api/todolists/';

  public getAllLists() : Observable<TodoList[]> {
    return this.handleCall(this.http.get<TodoList[]>(this.apiUrl()));
  }

  public addNewList(name : string) : Observable<TodoList> {
    return this.handleCall(this.http.post<TodoList>(this.apiUrl(), {'name' : name}));
  }

  public updateListName(id : string, newName : string) : Observable<TodoList> {
    return this.handleCall(this.http.put<TodoList>(`${this.apiUrl()}${id}/`, {'name' : newName}));
  }

  public removeList(id : string) : Observable<void> {
    return this.handleCall(this.http.delete<void>(`${this.apiUrl()}${id}`));
  }

  private apiUrl() : string {
    return this.server.getUrl(this.endpoint);
  }

}
