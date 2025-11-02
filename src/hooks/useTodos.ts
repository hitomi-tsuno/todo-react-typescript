// src/hooks/useTodos.ts
import { useState, useEffect, useRef, useMemo } from "react";
import { Todo } from "../types/todo";
import { Filter } from "../types/filter";

export const useTodos = () => {
  type SortKey = "completed" | "text" | "createdAt"; // ソートキーの型定義 completed: 完了状態、text: 内容、createdAt: 登録日時
  type SortOrder = "asc" | "desc"; // ソート順の型定義 asc: 昇順、desc: 降順

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const isInitialized = useRef(false);
  const [showPopup, setShowPopup] = useState(false); // ポップアップの表示状態
  const checkedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  ); // チェックされたToDoの数
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // 初期読み込み
  useEffect(() => {
    if (isInitialized.current) return;

    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTodos(parsed);
        console.log("[useEffect初期読み込み]parsed:", parsed); // ← これが配列として表示される！
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
    console.log("[useEffect保存]todos:", todos);
  }, [todos]);

  // 追加
  const addTodo = (text: string) => {
    console.log("追加前のtodos:", todos);
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // 削除
  const deleteTodo = (id: number) => {
    console.log("削除前のtodos:", todos);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 完了切り替え
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
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
    console.log("一括削除前のtodos:", todos);
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    setShowPopup(false);
  };

  // 一括完了・未完了
  const checkAll = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, completed: true })));
  };
  const uncheckAll = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, completed: false })));
  };

  // フィルター処理
  const applyFilter = (todos: Todo[], filter: Filter) => {
    let result: Todo[];

    switch (filter) {
      case "completed":
        result = todos.filter((t) => t.completed);
        break;
      case "incomplete":
        result = todos.filter((t) => !t.completed);
        break;
      default:
        result = todos;
    }

    console.log(`[applyFilter] filter: ${filter}, result:`, result);
    return result;
  };

  const filteredTodos = useMemo(() => {
    const result = applyFilter(todos, filter);
    return result;
  }, [todos, filter]);

  // ソート処理
  const sortedTodos = useMemo(() => {
    const result = [...filteredTodos].sort((a, b) => {
      let compare = 0;
      switch (sortKey) {
        case "completed":
          compare = Number(a.completed) - Number(b.completed);
          break;
        case "text":
          compare = a.text.localeCompare(b.text);
          break;
        case "createdAt":
          compare = a.createdAt.localeCompare(b.createdAt);
          break;
      }
      return sortOrder === "asc" ? compare : -compare;
    });

    console.log(
      `[sortedTodos] sortKey: ${sortKey}, sortOrder: ${sortOrder}, result:`,
      result
    );
    return result;
  }, [filteredTodos, sortKey, sortOrder]);

  // ソートキー・順序の設定
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // 同じキーなら昇順⇔降順を切り替え
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // 新しいキーなら昇順で開始
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return {
    todos,
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
  };
};
