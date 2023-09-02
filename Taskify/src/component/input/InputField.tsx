import React, { useRef } from "react";
import styles from "./css/Input.module.css";
import { TodoProps } from "../../props/ToDoProps";

function InputField({ toDo, setTodo, handleAdd }: TodoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form 
    className={`${styles.input}`}
    onSubmit={(e) => {
      e.preventDefault();
      handleAdd();
    }}
  >
    <input
      type="text"
      value={toDo}
      onChange={(e) => setTodo(e.target.value)}
      placeholder="Enter a task"
      className={`${styles.input__box}`}
    />
    <button className={`${styles.input__submit}`} type="submit">
      Add
    </button>
  </form>
);
}

export default InputField;
