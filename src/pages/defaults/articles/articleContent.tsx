import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useArticle from "../../../hooks/useArticle";
import { Article } from "../../../types/article";
import { FaSearch } from "react-icons/fa";

const ArticleContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArticleById } = useArticle();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("No article ID provided");
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
        setError("Error fetching article.");
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="container mx-auto p-4 max-w-5xl text-justify">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="mb-4 lg:mb-0 text-left lg:text-left">
          <Link to="/" className="text-orange-300">
            Home
          </Link>{" "}
          /
          <Link to="/articles" className="text-orange-300">
            Articles
          </Link>{" "}
          /<span>Seller</span>
        </div>
        <div className="relative w-full lg:w-auto">
          <FaSearch className="absolute top-2 left-2 text-gray-500 mt-1 ml-1 cursor-pointer" />
          <input
            type="text"
            placeholder="Search articles..."
            className="pl-8 pr-2 w-full lg:w-80 h-10 border
           border-gray-300 focus:outline-none focus:border-orange-300 rounded-full mb-4 lg:mb-0"
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {article && (
        <div className="lg:mt-12">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {article.topic}
          </h1>
          <div
            className="article-content text-justify"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleContent;
