import React from "react";
import { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void; // propsの型定義
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li onClick={() => toggleTodo(todo.id)}>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {todo.text}
      </span>
      {/* 削除ボタン */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // ← これがポイント！
          deleteTodo(todo.id);
        }}
      >
        削除
      </button>
    </li>
  );
};

export default TodoItem;
