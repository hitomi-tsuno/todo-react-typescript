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
      <tbody>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            // filteredTodos={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
