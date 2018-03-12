import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";
import {Item} from "../classes/item";

@Pipe({
  name : 'nameSearch'
})
export class NameSearchPipe implements PipeTransform {

  transform<T extends Item>(filteredArray : T[], searchName : string) : T[] {
    return _.filter(filteredArray, (element : T) => _.startsWith(_.toLower(element.name), _.toLower(searchName)));
  }

}
