import { useContext } from 'react';
import { ArticleContext } from '../context/ArticleContext';

const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticle must be used within a CartProvider');
  }
  return context;
};

export default useArticle;
