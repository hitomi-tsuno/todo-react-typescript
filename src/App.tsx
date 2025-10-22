import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); // ← 初期化フラグ 初期時に保存が実行され、todosがクリアされるために追加しています。

  /**
   * 初期読み込み
   * コンポーネント初回レンダリング時に一度だけ実行
   * JSON.parse でオブジェクトに戻します
   */
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    console.log("読み込んだtodos:", storedTodos);
    if (storedTodos) {
      try {
        const parsed = JSON.parse(storedTodos);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      } catch (e) {
        console.error("Failed to parse todos:", e);
      }
    }
    setIsInitialized(true); // ← 読み込み完了
  }, []);

  /**
   * 保存処理（初期化後のみ）
   * todos が変更されるたびに保存されます
   * JSON.stringify で文字列化して保存
   */
  useEffect(() => {
    if (isInitialized) {
      console.log("保存されるtodos:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**　削除機能の追加　**/
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {/* タイトル */}
      <h1>TODO List</h1>
      {/* テキストボックス */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいTODOを入力"
      />
      {/* 追加ボタン */}
      <button onClick={addTodo}>追加</button>
      {/* 一覧 */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
