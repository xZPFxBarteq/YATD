import {Injectable} from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class ArrayUpdaterService {

  constructor() {
  }

  public update<T>(current : T[], updated : T[]) : T[] {
    let intersection : T[] = _.intersectionWith(current, updated, _.isEqual);
    let difference : T[] = _.differenceWith(updated, current, _.isEqual);

    return intersection.concat(difference);
  }

}
