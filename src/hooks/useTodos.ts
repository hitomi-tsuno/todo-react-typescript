// src/hooks/useTodos.ts
import { useState, useEffect, useRef, useMemo } from "react";
import { Todo } from "../types/todo";
import { Filter } from "../types/filter";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const isInitialized = useRef(false);
  const [showPopup, setShowPopup] = useState(false); // ポップアップの表示状態
  const checkedCount = useMemo(
    () => todos.filter((t) => t.checked).length,
    [todos]
  ); // チェックされたToDoの数

  // 初期読み込み
  useEffect(() => {
    if (isInitialized.current) return;

    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTodos(parsed);
      } catch (e) {
        console.error("Failed to parse todos:", e);
      }
    }

    isInitialized.current = true;
  }, []);

  // 保存処理
  useEffect(() => {
    if (!isInitialized.current) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 追加
  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      checked: false,
      createdAt: new Date().toISOString(),
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
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // 一括削除
  const deleteChecked = () => {
    setTodos((prev) => prev.filter((todo) => !todo.checked));
    setShowPopup(false);
  };

  // 一括完了・未完了
  const checkAll = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, checked: true })));
  };
  const uncheckAll = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, checked: false })));
  };

  // フィルター処理
  const applyFilter = (todos: Todo[], filter: Filter) => {
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.checked);
      case "incomplete":
        return todos.filter((t) => !t.checked);
      default:
        return todos;
    }
  };
  const filteredTodos = applyFilter(todos, filter);

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
    checkedCount,
    showPopup,
    setShowPopup,
  };
};
