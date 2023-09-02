import { Todo } from "../model/Todo";
export interface TodoProps{
    toDo:string,
    setTodo(todo:string):void;
    handleAdd():void;
}