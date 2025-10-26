import React from "react";
import { Todo } from "../types/todo"; // TODOの型定義
import TodoItem from "./TodoItem"; // TodoItemコンポーネント

interface Props {
  todos: Todo[];
  filteredTodos: Todo[];
  deleteTodo: (id: number) => void; // propsの型定義
  filterTodo: (id: number) => void; // propsの型定義
}

const TodoList: React.FC<Props> = ({
  todos,
  filteredTodos,
  deleteTodo,
  filterTodo,
}) => {
  return (
    <ul>
      <table>
        <tbody>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              filteredTodos={todo}
              deleteTodo={deleteTodo}
              filterTodo={filterTodo}
            />
          ))}
        </tbody>
      </table>
    </ul>
  );
};

export default TodoList;
