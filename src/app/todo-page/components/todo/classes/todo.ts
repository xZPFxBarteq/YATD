import {Item} from "../../../../shared/classes/item";

export class Todo implements Item {

  id : string;
  name : string;
  is_complete : boolean;
  todo_list : string;

}
