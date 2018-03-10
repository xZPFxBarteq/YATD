import {Injectable} from '@angular/core';
import {TodoList} from "../classes/todo-list";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TodoListRepositoryService {

  private apiUrl : string = 'https://todos.venturedevs.net/api/todolists/';

  constructor(private http : HttpClient) {
  }

  public getAllLists() : Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.apiUrl);
  }

  public addNewList(name : string) : Observable<TodoList> {
    return this.http.post<TodoList>(this.apiUrl, {'name' : name});
  }

  public updateListName(id : string, newName : string) : Observable<TodoList> {
    return this.http.put<TodoList>(`${this.apiUrl}${id}/`, {'name' : newName});
  }

  public removeList(id : string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

}
