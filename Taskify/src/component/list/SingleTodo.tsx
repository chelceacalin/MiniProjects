import React, { useState } from "react";
import { Todo } from "../../model/Todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import styles from "./css/TodoList.module.css";
import { handleDone, handleDelete, handleEdit } from "./ToDoFunctions";
import { Draggable } from "react-beautiful-dnd";
interface TodoProps {
  key: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

function SingleTodo({ todo, todos, setTodos, index }: TodoProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.toDo);

  let getFormattedDate = (): string => {
    let date: string = new Date(todo.id).toString();
    const dateObject = new Date(date);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = date && date.split(" ")[1];
    const year = dateObject.getFullYear();

    return `${day} ${month} ${year}`;
  };

  let renderIsDone = () => {
    return (
      <div>
        <s
          className={`${styles.todos__single__text}`}
          style={{ color: "green" }}
        >
          {todo.toDo}
        </s>
        <div>Completed Time: {getFormattedDate()}</div>
      </div>
    );
  };

  let renderIsNotDone = () => {
    return (
      <div>
        <div className={`${styles.todos__single__text}`}>{todo.toDo}</div>
        <div> Created Date: {getFormattedDate()}</div>
      </div>
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`${styles.todos__single}`}
          onSubmit={(e) => {
            handleEdit(e, todo.id, todos, setTodos, editTodo, setEdit);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <>
              <input
                value={editTodo}
                className={`${styles.todos__single__text}`}
                onChange={(e) => {
                  e.preventDefault();
                  setEditTodo(e.target.value);
                }}
              />
            </>
          ) : (
            <>{todo.isDone ? renderIsDone() : renderIsNotDone()}</>
          )}

          <div className={`${styles.iconsSpacing}`}>
            <span
              className={`${styles.icon}`}
              onClick={(e) => {
                e.preventDefault();
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className={`${styles.icon}`}
              onClick={(e) => {
                e.preventDefault();
                handleDelete(todo.id, setTodos, todos);
              }}
            >
              <AiFillDelete />
            </span>
            <span
              className={`${styles.icon}`}
              onClick={(e) => {
                e.preventDefault();
                handleDone(todo.id, setTodos, todos);
              }}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}

export default SingleTodo;
