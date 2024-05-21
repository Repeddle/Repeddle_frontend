import { Key, ReactNode } from "react";

export interface Article {
  id: Key | null | undefined;
  title: ReactNode;
  _id: number;
  topic: string;
  category: string;
  content: string;
}

export interface ArticleData {
  topic: string;
  category: string;
  content: string;
}
