import { Pipe, PipeTransform } from '@angular/core';
import {TodoList} from "../classes/todo-list";
import * as _ from "lodash";

@Pipe({
  name: 'todoListNameSearch'
})
export class TodoListNameSearchPipe implements PipeTransform {

  transform(lists: TodoList[], searchName: string): TodoList[] {
    return _.filter(lists, list => _.startsWith(_.toLower(list.name), _.toLower(searchName)));
  }

}
