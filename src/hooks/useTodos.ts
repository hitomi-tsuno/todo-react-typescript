// src/hooks/useTodos.ts
import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { Filter } from "../types/filter";


export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [isInitialized, setIsInitialized] = useState(false);
 const [showPopup, setShowPopup] = useState(false); // ポップアップの表示状態

  // 初期読み込み
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTodos(parsed);
      } catch (e) {
        console.error("Failed to parse todos:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 保存処理
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  // 追加
const addTodo = (text: string) => {
  if (!text.trim()) return;
  const newTodo: Todo = {
    id: Date.now(),
    text,
    checked: false,
    createdAt: new Date().toLocaleString(),
  };
  setTodos((prev) => [...prev, newTodo]);
};

  // 削除
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 完了切り替え
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  // 編集
  const updateTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // 一括削除
  const deleteChecked = () => {
    setTodos((prev) => prev.filter((todo) => !todo.checked));
    setShowPopup(false)
  };

  // 一括完了・未完了
  const checkAll = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, checked: true })));
  };
  const uncheckAll = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, checked: false })));
  };

  // フィルター処理
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.checked;
    if (filter === "incomplete") return !todo.checked;
    return true;
  });

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    deleteChecked,
    checkAll,
    uncheckAll,
    checkedCount: todos.filter((t) => t.checked).length,
    showPopup,
    setShowPopup,
  };
};