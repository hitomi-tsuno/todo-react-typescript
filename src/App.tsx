import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo"; // TODOの型定義
import { Filter } from "./types/filter"; // フィルターの型定義
import TodoList from "./components/TodoList"; // TodoListコンポーネント
import StyledButton from "./components/StyledButton"; // スタイリングされたボタンコンポーネント
import StyledPopup from "./components/StyledPopup"; // スタイリングされたポップアップコンポーネント
import { GlobalStyle } from "./styles/GlobalStyle"; // グローバルスタイル

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState(""); // 入力中のテキスト
  const [filter, setFilter] = useState<Filter>("all"); // フィルター状態の管理
  const [isInitialized, setIsInitialized] = useState(false); // ← 初期化フラグ 初期時に保存が実行され、todosがクリアされるために追加しています。
  const [showPopup, setShowPopup] = useState(false); // ポップアップの表示状態
  const checkedCount = todos.filter((todo) => todo.checked).length; // 完了済みのTODO数

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
      createdAt: new Date().toLocaleString(), // 作成日時
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  /**
   * TODO一括削除処理
   * 「一括削除」ボタン押下時に実行
   */
  const alldeleteTodo = () => {
    console.log("一括削除実行");
    // 完了済みのTodoを除外して新しい配列を作成
    const remainingTodos = todos.filter((todo) => !todo.checked);
    setTodos(remainingTodos);
    setShowPopup(false); // 削除後にポップアップを非表示にする
  };

  /**
   * TODO一括完了処理
   * 「一括完了」ボタン押下時に実行
   */
  const checkAllTodos = () => {
    const updated = todos.map((todo) => ({ ...todo, checked: true }));
    setTodos(updated);
  };

  /**
   * TODO一括未完了処理
   * 「一括未完了」ボタン押下時に実行
   */
  const uncheckAllTodos = () => {
    const updated = todos.map((todo) => ({ ...todo, checked: false }));
    setTodos(updated);
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
      case "incomplete":
        return !todo.checked;
      default:
        return todo;
    }
  });

  /*
   * Todo更新処理
   * 編集完了時に実行
   */
  const UpdateTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <>
      <GlobalStyle />

      <div>
        {/* タイトル */}
        <h1>TODO List</h1>
        {/* フィルター　全件 / 完了 / 未完了 */}
        <select
          defaultValue="all"
          onChange={(e) => handleFilter(e.target.value as Filter)}
        >
          <option value="all">全件</option>
          <option value="completed">完了のみ</option>
          <option value="incomplete">未完了のみ</option>
        </select>
        <br />
        {/* テキストボックス */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいTODOを入力"
        />
        {/* 追加ボタン */}
        <StyledButton onClick={addTodo}>追加</StyledButton>
        {/* 一括削除ボタン 削除件数＞0の場合のみ一括ボタンを表示する。*/}
        {checkedCount > 0 && (
          <StyledButton onClick={() => setShowPopup(true)}>
            一括削除 対象：{checkedCount}件
          </StyledButton>
        )}
        {/* ポップアップコンポーネント */}
        {showPopup && (
          <StyledPopup>
            <p>完了済みのタスクをすべて削除しますか？</p>
            <StyledButton onClick={() => alldeleteTodo()}>はい</StyledButton>
            <StyledButton onClick={() => setShowPopup(false)}>
              いいえ
            </StyledButton>
          </StyledPopup>
        )}
        <br />
        {/* 一括完了・未完了ボタン */}
        {todos.length > 0 &&
          (checkedCount === todos.length ? (
            <StyledButton onClick={uncheckAllTodos}>
              すべて未完了にする
            </StyledButton>
          ) : (
            <StyledButton onClick={checkAllTodos}>
              すべて完了にする
            </StyledButton>
          ))}
        {/* 一覧 */}
        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          deleteTodo={deleteTodo}
          filterTodo={filterTodo}
          UpdateTodo={UpdateTodo}
        />
      </div>
    </>
  );
};

export default App;
