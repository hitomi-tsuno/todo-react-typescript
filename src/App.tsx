import React, { useState } from "react";
import { Filter } from "./types/filter"; // フィルターの型定義
import TodoList from "./components/TodoList"; // TodoListコンポーネント
import StyledButton from "./components/StyledButton"; // スタイリングされたボタンコンポーネント
import StyledPopup from "./components/StyledPopup"; // スタイリングされたポップアップコンポーネント
import { GlobalStyle } from "./styles/GlobalStyle"; // グローバルスタイル
import { useTodos } from "./hooks/useTodos";

const App: React.FC = () => {
  const [text, setText] = useState(""); // 入力中のテキスト

  const {
    filteredTodos,
    sortedTodos,
    filter,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    deleteChecked,
    checkAll,
    uncheckAll,
    checkedCount,
    showPopup,
    setShowPopup,
    handleSort,
    sortKey,
    sortOrder,
  } = useTodos();

  return (
    <>
      <GlobalStyle />

      <div>
        {/* タイトル */}
        <h1>TODO List</h1>

        <div>
          {/* フィルター　全件 / 完了 / 未完了 */}
          フィルター：
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
          >
            <option value="all">全件</option>
            <option value="completed">完了のみ</option>
            <option value="incomplete">未完了のみ</option>
          </select>
        </div>

        <div>
          {/* テキストボックス */}
          <input
            aria-label="新しいTODOを入力"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim() !== "") {
                addTodo(text.trim());
                setText("");
              }
            }}
            placeholder="新しいTODOを入力"
          />

          {/* 追加ボタン */}
          <StyledButton
            onClick={() => {
              if (text.trim() === "") return; // 空文字は追加しない
              addTodo(text); // TODOを追加
              setText(""); // 入力欄をクリア ← これがポイント！
            }}
          >
            追加
          </StyledButton>

          {/* 一括削除ボタン 削除件数＞0の場合のみ一括ボタンを表示する。*/}
          {checkedCount > 0 && (
            <StyledButton
              onClick={() => setShowPopup(true)}
              title="完了でチェック済の行を削除します"
            >
              一括削除 対象：{checkedCount}件
            </StyledButton>
          )}

          {/* ポップアップコンポーネント
        一括削除ボタンクリック時に表示されます */}
          {showPopup && (
            <StyledPopup>
              <p>完了済みのタスクをすべて削除しますか？</p>
              <StyledButton onClick={() => deleteChecked()}>はい</StyledButton>
              <StyledButton onClick={() => setShowPopup(false)}>
                いいえ
              </StyledButton>
            </StyledPopup>
          )}
        </div>

        {/* 一覧 */}
        <TodoList
          filteredTodos={filteredTodos}
          sortedTodos={sortedTodos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
          checkedCount={checkedCount}
          checkAll={checkAll}
          uncheckAll={uncheckAll}
          handleSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
      </div>
    </>
  );
};

export default App;
