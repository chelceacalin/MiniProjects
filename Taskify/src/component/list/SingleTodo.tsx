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
            <>
              {todo.isDone ? (
                <s
                  className={`${styles.todos__single__text}`}
                  style={{ color: "green" }}
                >
                  {todo.toDo}
                </s>
              ) : (
                <span className={`${styles.todos__single__text}`}>
                  {todo.toDo}
                </span>
              )}
            </>
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
