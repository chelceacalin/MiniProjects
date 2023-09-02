import React, { useState } from "react";
import "./App.css";
import InputField from "./component/input/InputField";
import { Todo } from "./model/Todo";
import TodoList from "./component/list/TodoList";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
function App(): React.JSX.Element {
  const [toDo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = () => {
    if (toDo) {
      setTodos([...todos, { id: Date.now(), toDo: toDo, isDone: false }]);
      setTodo("");
    }
  };

   const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = source.droppableId === 'TodosList' ? [...todos] : [...completedTodos];
    const finish = destination.droppableId === 'TodosList' ? [...todos] : [...completedTodos];

    const [removed] = start.splice(source.index, 1);
    finish.splice(destination.index, 0, removed);

    if (source.droppableId === 'TodosList') {
      setTodos(start);
    } else {
      setCompletedTodos(start);
    }

    if (destination.droppableId === 'TodosList') {
      setTodos(finish);
    } else {
      setCompletedTodos(finish);
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>

      <InputField toDo={toDo} setTodo={setTodo} handleAdd={handleAdd} />
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setCompletedTodos={setCompletedTodos}
          completedTodos={completedTodos}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
