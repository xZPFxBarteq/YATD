import {Injectable} from '@angular/core';
import * as _ from "lodash";
import {Item} from "../classes/item";

@Injectable()
export class ArrayUpdaterService {

  constructor() {
  }

  public update<T extends Item>(current : T[], updated : T[]) : T[] {
    let intersection : T[] = _.intersectionWith(current, updated, (a, b) => a.id == b.id);
    let difference : T[] = _.differenceWith(updated, current, (a, b) => a.id == b.id);

    return intersection.concat(difference);
  }

}
