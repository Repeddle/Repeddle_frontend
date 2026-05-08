import api from "./api";
import {
  RestrictedWord,
  ModerationStatusUpdate,
  ModerationResponse,
  WhitelistedWord,
} from "../types/moderation";

const moderationService = {
  getRestrictedWords: (
    page: number = 1,
    limit: number = 20
  ): Promise<ModerationResponse<RestrictedWord[]>> => {
    return api.get(`/moderation/restricted-words?page=${page}&limit=${limit}`);
  },

  addRestrictedWord: (
    word: string,
  ): Promise<ModerationResponse<RestrictedWord>> => {
    return api.post("/moderation/restricted-words", { word });
  },

  bulkAddRestrictedWords: (
    words: string[],
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
    data: ModerationStatusUpdate,
  ): Promise<ModerationResponse<any>> => {
    return api.patch("/moderation/status", data);
  },

  getWhitelistedWords: (
    page: number = 1,
    limit: number = 20
  ): Promise<ModerationResponse<WhitelistedWord[]>> => {
    return api.get(`/moderation/whitelisted-words?page=${page}&limit=${limit}`);
  },

  addWhitelistedWord: (
    word: string,
  ): Promise<ModerationResponse<WhitelistedWord>> => {
    return api.post("/moderation/whitelisted-words", { word });
  },

  bulkAddWhitelistedWords: (
    words: string[],
  ): Promise<{
    status: boolean;
    insertedCount: number;
    message: string;
  }> => {
    return api.post("/moderation/whitelisted-words/bulk", { words });
  },

  removeWhitelistedWord: (id: string): Promise<ModerationResponse<any>> => {
    return api.delete(`/moderation/whitelisted-words/${id}`);
  },
};

export default moderationService;
