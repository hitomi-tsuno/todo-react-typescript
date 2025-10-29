import React, { useState } from "react";
import { Todo } from "../types/todo"; // TODOの型定義
import StyledButton from "../components/StyledButton"; // スタイリングされたボタンコンポーネント
import StyledDate from "../components/StyledDate"; // スタイリングされた日付コンポーネント
import StyledText from "../components/StyledText"; // スタイリングされたテキストコンポーネント

interface Props {
  todo: Todo;
  deleteTodo: (id: number) => void; // propsの型定義
  toggleTodo: (id: number) => void; // propsの型定義
  updateTodo: (id: number, newText: string) => void; // propsの型定義
}

const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  toggleTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false); // 編集モードの状態管理
  const [editText, setEditText] = useState(todo.text); // 編集中のテキスト管理

  // 編集確定処理
  const handleUpdate = () => {
    const trimmed = editText.trim();
    if (trimmed === "") return;
    updateTodo(todo.id, trimmed);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {/* 完了チェックボックス */}
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={(e) => toggleTodo(todo.id)}
        />
      </td>

      <td>
        {/* TODOの内容 */}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
            }}
            autoFocus
          />
        ) : (
          <StyledText
            checked={todo.checked}
            onClick={() => setIsEditing(true)}
            title="クリックして編集"
          >
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
        {isEditing && (
          <StyledButton
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
          >
            削除
          </StyledButton>
        )}
      </td>
    </tr>
  );
};

export default TodoItem;
