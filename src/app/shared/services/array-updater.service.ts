import {Injectable} from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class ArrayUpdaterService {

  constructor() {
  }

  public updateList<T>(currentLists : T[], updatedLists : T[]) : T[] {
    let intersection : T[] = _.intersectionWith(currentLists, updatedLists, _.isEqual);
    let difference : T[] = _.differenceWith(updatedLists, currentLists, _.isEqual);

    return intersection.concat(difference);
  }

}
