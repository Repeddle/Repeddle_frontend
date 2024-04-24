import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useArticle from '../../../hooks/useArticle';
import { Article } from '../../../types/article';

const ArticleContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArticleById } = useArticle();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('No article ID provided');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const article = await fetchArticleById(id);
        setArticle(article);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error fetching article.');
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {article && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{article.topic}</h1>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleContent;
