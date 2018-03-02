import { Injectable } from '@angular/core';
import {ToDoList} from "../classes/to-do-list";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ToDoListRepositoryService {

  private apiUrl : string = 'https://todos.venturedevs.net/api/todolists/';

  constructor(private http: HttpClient) { }

  public getAllLists() : Observable<ToDoList[]> {
    return this.http.get<ToDoList[]>(this.apiUrl);
  }

  public addNewList(name : string) : Observable<ToDoList> {
    return this.http.post<ToDoList>(this.apiUrl, { 'name' : name });
  }

  public updateListName(id : string, newName : string) : Observable<ToDoList> {
    return this.http.put<ToDoList>(`${this.apiUrl}${id}/`, { 'name' : newName });
  }

  public removeList(id : string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

}
