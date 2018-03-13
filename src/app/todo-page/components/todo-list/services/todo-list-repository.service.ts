import {Injectable} from '@angular/core';
import {TodoList} from "../classes/todo-list";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ServerService} from "../../../../shared/services/server.service";

@Injectable()
export class TodoListRepositoryService {

  private endpoint : string = 'api/todolists/';

  constructor(private http : HttpClient,
              private server : ServerService) {
  }

  public getAllLists() : Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.apiUrl());
  }

  public addNewList(name : string) : Observable<TodoList> {
    return this.http.post<TodoList>(this.apiUrl(), {'name' : name});
  }

  public updateListName(id : string, newName : string) : Observable<TodoList> {
    return this.http.put<TodoList>(`${this.apiUrl()}${id}/`, {'name' : newName});
  }

  public removeList(id : string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl()}${id}`);
  }

  private apiUrl() : string {
    return this.server.getUrl(this.endpoint);
  }

}
