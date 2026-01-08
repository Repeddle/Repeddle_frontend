import api from "./api";
import {
  RestrictedWord,
  ModerationStatusUpdate,
  ModerationResponse,
} from "../types/moderation";

const moderationService = {
  getRestrictedWords: (): Promise<ModerationResponse<RestrictedWord[]>> => {
    return api.get("/moderation/restricted-words");
  },

  addRestrictedWord: (
    word: string
  ): Promise<ModerationResponse<RestrictedWord>> => {
    return api.post("/moderation/restricted-words", { word });
  },

  bulkAddRestrictedWords: (
    words: string[]
  ): Promise<{
    status: boolean;
    insertedCount: number;
    message: string;
  }> => {
    return api.post("/moderation/restricted-words/bulk", { words });
  },

  removeRestrictedWord: (id: string): Promise<ModerationResponse<any>> => {
    return api.delete(`/moderation/restricted-words/${id}`);
  },

  updateModerationStatus: (
    data: ModerationStatusUpdate
  ): Promise<ModerationResponse<any>> => {
    return api.patch("/moderation/status", data);
  },
};

export default moderationService;
