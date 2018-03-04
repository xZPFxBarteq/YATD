import { Injectable } from '@angular/core';
import {ToDoList} from "../classes/to-do-list";
import * as _ from "lodash";

@Injectable()
export class TodoListArrayUpdaterService {

  constructor() { }

  public updateList(currentLists : ToDoList[], updatedLists : ToDoList[]) : ToDoList[] {
    let intersection : ToDoList[] = _.intersectionWith(currentLists, updatedLists, _.isEqual);
    let difference : ToDoList[] = _.differenceWith(updatedLists, currentLists, _.isEqual);

    return intersection.concat(difference);
  }

}
