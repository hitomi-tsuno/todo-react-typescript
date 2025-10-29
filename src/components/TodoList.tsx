import React from "react";
import { Todo } from "../types/todo"; // TODOの型定義
import TodoItem from "./TodoItem"; // TodoItemコンポーネント

interface Props {
  filteredTodos: Todo[];
  deleteTodo: (id: number) => void; // propsの型定義
  toggleTodo: (id: number) => void; // propsの型定義
  updateTodo: (id: number, newText: string) => void; // propsの型定義
}

const TodoList: React.FC<Props> = ({
  filteredTodos,
  deleteTodo,
  toggleTodo,
  updateTodo,
}) => {
  return (
    <table>
      {/* ヘッダ部 */}
      <thead>
        <tr>
          <th>完了</th>
          <th>内容</th>
          <th>操作</th>
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
