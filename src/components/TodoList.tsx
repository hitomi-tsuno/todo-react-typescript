import React from "react";
import { Todo } from "../types/todo"; // TODOの型定義
import TodoItem from "./TodoItem"; // TodoItemコンポーネント
import StyledTableHeader from "./StyledTableHeader"; // スタイリングされたテーブルヘッダーコンポーネント

interface Props {
  filteredTodos: Todo[];
  deleteTodo: (id: number) => void; // propsの型定義
  toggleTodo: (id: number) => void; // propsの型定義
  updateTodo: (id: number, newText: string) => void; // propsの型定義
  checkedCount: number;
  checkAll: () => void;
  uncheckAll: () => void;
}

const TodoList: React.FC<Props> = ({
  filteredTodos,
  deleteTodo,
  toggleTodo,
  updateTodo,
  checkedCount,
  checkAll,
  uncheckAll,
}) => {
  return (
    <table>
      {/* ヘッダ部 */}
      <thead>
        <tr>
          <StyledTableHeader>
            <input
              type="checkbox"
              checked={checkedCount === filteredTodos.length}
              onChange={(e) => (e.target.checked ? checkAll() : uncheckAll())}
            />
            完了
          </StyledTableHeader>
          <StyledTableHeader>内容</StyledTableHeader>
          <StyledTableHeader>登録日時</StyledTableHeader>
          <StyledTableHeader>操作</StyledTableHeader>
        </tr>
      </thead>

      {/* ボディ部 */}
      <tbody>
        {filteredTodos.length === 0 ? (
          <tr>
            <td colSpan={3}>表示するTODOがありません</td>
          </tr>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default TodoList;
