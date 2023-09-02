import React from "react";
import { Todo } from "../../model/Todo";
import SingleTodo from "./SingleTodo";
import styles from "./css/TodoList.module.css";
import { Droppable } from "react-beautiful-dnd";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
}

function TodoList(props: TodoListProps) {
  const { todos, completedTodos, setTodos, setCompletedTodos } = props;
  return (
    <div className={`${styles.container}`}>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
          ref={provided.innerRef}
          {...provided.droppableProps}
            className={`${snapshot.isDraggingOver ? `${styles.dragactive}` : ""} ${styles.todos}`}
          >
            <span className={`${styles.todos__heading} `}>Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>


      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.todos}
            ${styles.remove}
            `}
          >
            <span className={`${styles.todos__heading}`}>Completed Tasks</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TodoList;
