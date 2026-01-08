import { useState, useEffect } from "react";
import moderationService from "../services/moderation";
import { RestrictedWord } from "../types/moderation";

export const useModeration = () => {
  const [restrictedWords, setRestrictedWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const response = await moderationService.getRestrictedWords();
        if (response.status) {
          setRestrictedWords(
            response.data.map((w: RestrictedWord) => w.word.toLowerCase())
          );
        }
      } catch (error) {
        console.error("Failed to fetch restricted words", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  const checkRestricted = (text: string): string[] => {
    if (!text) return [];
    const foundWords = restrictedWords.filter((word) =>
      text.toLowerCase().includes(word)
    );
    return foundWords;
  };

  return { restrictedWords, checkRestricted, loading };
};
