/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ReactNode, createContext } from 'react';
import {
  fetchArticles,
  fetchCategories,
  fetchArticleById,
  createArticle as createArticleService,
  updateArticle as updateArticleService,
  deleteArticle as deleteArticleService,
} from '../services/article';
import { Article } from '../types/article';
import useAuth from '../hooks/useAuth';

type Props = {
  children: ReactNode;
};

interface ArticleContextData {
  articles: Article[];
  categories: string[];
  loading: boolean;
  error: string;
  fetchArticleById: (id: string) => Promise<Article>;
  fetchArticles: (search?: string) => Promise<Article[]>;
  createArticle: (articleData: Article) => Promise<boolean>;
  updateArticle: (
    _id: number,
    articleData: Partial<Article>
  ) => Promise<boolean>;
  deleteArticle: (_id: number) => Promise<boolean>;
}

// Create the ArticleContext
export const ArticleContext = createContext<ArticleContextData | undefined>(undefined);

// ArticleProvider component
const ArticleProvider: React.FC<Props> = ({ children }) => {
  const { setAuthErrorModalOpen } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleError = (error: any) => {
    setLoading(false);
    if (error === 'Token expired' || error === 'Invalid token') {
      setError('');
      setAuthErrorModalOpen(true);
    } else {
      setError(error || 'An error occurred.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await fetchArticles();
        const fetchedCategories = await fetchCategories();
        setArticles(fetchedArticles);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createArticle = async (articleData: Article): Promise<boolean> => {
    try {
      const createdArticle = await createArticleService(articleData);
      setArticles([...articles, createdArticle]);
      return true;
    } catch (error) {
      console.error('Error creating article:', error);
      handleError(error);
      return false;
    }
  };

  const updateArticle = async (
    _id: number,
    articleData: Partial<Article>
  ): Promise<boolean> => {
    try {
      await updateArticleService(_id, articleData);
      const updatedArticles = articles.map((article) =>
        article._id === _id? {...article,...articleData } : article
      );
      setArticles(updatedArticles);
      return true;
    } catch (error) {
      console.error('Error updating article:', error);
      handleError(error);
      return false;
    }
  };

  const deleteArticle = async (_id: number): Promise<boolean> => {
    try {
      await deleteArticleService(_id);
      setArticles(articles.filter((article) => article._id!== _id));
      return true;
    } catch (error) {
      console.error('Error deleting article:', error);
      handleError(error);
      return false;
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        categories,
        loading,
        error,
        fetchArticleById,
        fetchArticles,
        createArticle,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleProvider;