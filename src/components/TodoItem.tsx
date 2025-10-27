import React, { useState } from "react";
import { Todo } from "../types/todo"; // TODOの型定義
import StyledButton from "../components/StyledButton"; // スタイリングされたボタンコンポーネント
import StyledDate from "../components/StyledDate"; // スタイリングされた日付コンポーネント
import StyledText from "../components/StyledText"; // スタイリングされたテキストコンポーネント

interface Props {
  todo: Todo;
  filteredTodos: Todo;
  deleteTodo: (id: number) => void; // propsの型定義
  filterTodo: (id: number) => void; // propsの型定義
  UpdateTodo: (id: number, newText: string) => void; // propsの型定義
}

const TodoItem: React.FC<Props> = ({
  todo,
  filteredTodos,
  deleteTodo,
  filterTodo,
  UpdateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

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
        {/* <StyledText checked={todo.checked}>{todo.text}</StyledText> */}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => {
              UpdateTodo(todo.id, editText); // 親から渡された更新関数
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                UpdateTodo(todo.id, editText);
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <StyledText checked={todo.checked} onClick={() => setIsEditing(true)}>
            {todo.text}
          </StyledText>
        )}
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
