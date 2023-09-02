import { Todo } from "../../model/Todo";

export const handleDone = (id: number
    ,setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
    todos:Todo[]): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };



export const handleDelete=(id:number ,setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
    todos:Todo[]):void=>{
    setTodos(todos.filter((todo)=>todo.id!==id));
 }

 export  const handleEdit = (e: React.FormEvent, id: number,todos:Todo[],setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,editTodo:string,setEdit: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, toDo: editTodo } : todo))
    );

    setEdit(false);
  };