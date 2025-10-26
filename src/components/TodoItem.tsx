import React from "react";
import { Todo } from "../types/todo"; // TODOの型定義
import StyledButton from "../components/StyledButton"; // スタイリングされたボタンコンポーネント
import StyledDate from "../components/StyledDate"; // スタイリングされた日付コンポーネント
import StyledText from "../components/StyledText"; // スタイリングされたテキストコンポーネント
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
    // <li key={todo.id}>
    <tr key={todo.id}>
      <td>
        {/* 完了チェックボックス */}
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={(e) => filterTodo(todo.id)}
        />
      </td>
      <td>
        {/* TODOの内容 */}
        <StyledText checked={todo.checked}>{todo.text}</StyledText>
      </td>
      <td>
        {/* 登録日時 */}
        <StyledDate>登録日時: {todo.createdAt}</StyledDate>
      </td>
      <td>
        {/* 削除ボタン */}
        <StyledButton
          onClick={(e) => {
            e.stopPropagation(); // ← これがポイント！
            deleteTodo(todo.id);
          }}
        >
          削除
        </StyledButton>
      </td>
    </tr>
    // </li>
  );
};

export default TodoItem;
