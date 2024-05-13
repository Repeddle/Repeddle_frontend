import { useState, useEffect } from 'react';
import { fetchArticles } from '../services/article';
import { Article } from '../types/article';

const useArticle = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error? error.message : 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { articles, setArticles, loading, error };
};

export default useArticle;
