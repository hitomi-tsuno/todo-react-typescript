import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import { Filter } from "./types/filter";
import TodoList from "./components/TodoList";

// フィルターの型定義

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState(""); // 入力中のテキスト
  const [filter, setFilter] = useState<Filter>("all"); // フィルター状態の管理
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

  /**
   * TODO追加処理
   * 「追加」ボタン押下時に実行
   */
  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      checked: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  /**
   * Todo削除処理
   * 「削除」ボタン押下時に実行
   */
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /**
   * Todo完了切替処理
   * チェックボックス変更時に実行
   */
  const filterTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };
  
  // フィルター切り替え処理
  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  // フィルタリング処理
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return todo;
      case "completed":
        return todo.checked;
      case "active":
        return !todo.checked;
      default:
        return todo;
    }
  });

  return (
    <div>
      {/* タイトル */}
      <h1>TODO List</h1>

      {/* 全件 / 完了 / 未完了 */}
      <select
        defaultValue="all"
        onChange={(e) => handleFilter(e.target.value as Filter)}
      >
        <option value="all">全件</option>
        <option value="completed">完了</option>
        <option value="active">未完了</option>
      </select>

      {/* テキストボックス */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいTODOを入力"
      />

      {/* 追加ボタン */}
      <button onClick={addTodo}>追加</button>

      {/* 一覧 */}
      <TodoList
        todos={todos}
        filteredTodos={filteredTodos}
        deleteTodo={deleteTodo}
        filterTodo={filterTodo}
      />
    </div>
  );
};

export default App;
