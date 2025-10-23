import React from "react";
import { Todo } from "../types/todo";
import { Filter } from "../types/filter";

interface Props {
  todo: Todo;
  filteredTodos: Todo;
  deleteTodo: (id: number) => void; // propsの型定義
  filterTodo: (id: number) => void; // propsの型定義
}

const TodoItem: React.FC<Props> = ({
  todo,
  filteredTodos,
  deleteTodo,
  filterTodo,
}) => {
  return (
    <li key={todo.id}>
      {/* 完了チェックボックス */}
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={(e) => filterTodo(todo.id)}

        //        onChange={() => handleCheck(todo.id, todo.checked)}
      />

      {/* TODOの内容 */}
      <span>{todo.text}</span>

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
