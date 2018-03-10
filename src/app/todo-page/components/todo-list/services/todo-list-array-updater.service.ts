import {Injectable} from '@angular/core';
import {TodoList} from "../classes/todo-list";
import * as _ from "lodash";

@Injectable()
export class TodoListArrayUpdaterService {

  constructor() {
  }

  public updateList(currentLists : TodoList[], updatedLists : TodoList[]) : TodoList[] {
    let intersection : TodoList[] = _.intersectionWith(currentLists, updatedLists, _.isEqual);
    let difference : TodoList[] = _.differenceWith(updatedLists, currentLists, _.isEqual);

    return intersection.concat(difference);
  }

}
