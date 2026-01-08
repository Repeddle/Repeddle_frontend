export interface RestrictedWord {
  _id: string;
  word: string;
  createdAt: string;
}

export interface ModerationStatusUpdate {
  targetType: "product" | "review" | "comment" | "reply";
  targetId: string;
  status: "approved" | "flagged" | "pending_review";
}

export interface ModerationResponse<T> {
  status: boolean;
  data: T;
}
