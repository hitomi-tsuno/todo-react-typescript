// TODOアイテムの型定義
export interface Todo {
  id: number;
  text: string; // TODOの内容
  checked: boolean // 完了済みかどうかのフラグ
  createdAt: string; // 作成日時
}
