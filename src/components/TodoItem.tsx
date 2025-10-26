import React from "react";
import { Todo } from "../types/todo";
import StyledButton from "../components/StyledButton";
import StyledDate from "../components/StyledDate";
import StyledText from "../components/StyledText";

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
      />

      {/* TODOの内容 */}
      <StyledText checked={todo.checked}>{todo.text}</StyledText>

      {/* 登録日時 */}
      <StyledDate>登録日時: {todo.createdAt}</StyledDate>

      {/* 削除ボタン */}
      <StyledButton
        onClick={(e) => {
          e.stopPropagation(); // ← これがポイント！
          deleteTodo(todo.id);
        }}
      >
        削除
      </StyledButton>
    </li>
  );
};

export default TodoItem;
