import { useEffect, useState } from 'react';
import useArticle from '../../../hooks/useArticle';
import { Article } from '../../../types/article';
import { Link } from 'react-router-dom';

function Articles() {
  const { articles, categories, loading, fetchArticles } = useArticle();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArticles([]);
      return;
    }

    const searchArticles = async () => {
      try {
        const filteredArticles = await fetchArticles(searchQuery);
        console.log('art', filteredArticles);
        setFilteredArticles(filteredArticles);
      } catch (error) {
        console.log('Error searching articles');
      }
    };

    searchArticles();
  }, [searchQuery]);

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-4 w-3/4 mb-2 bg-gray-300 rounded"></div>
      <div className="h-4 w-full mb-2 bg-gray-300 rounded"></div>
      <div className="h-4 w-5/6 mb-2 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div>
      <section className="mb-8 bg-light-ev2 dark:bg-dark-ev2 px-16 md:px-20 py-16 md:py-20 ">
        <h1 className="text-3xl md:text-6xl text-center mb-10 font-bold">
          How can we help?
        </h1>
        <div className="lg:w-6/12 mx-auto relative justify-center items-center -mt-5">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full py-4 px-8 border  border-gray-300 rounded-full focus:outline-none focus:border-orange-300
            text-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredArticles.length !== 0 && searchQuery && (
            <div className="absolute z-10 bg-gray-100 mt-2 w-full border border-gray-300 rounded-lg overflow-auto max-h-60">
              {filteredArticles.map((article) => (
                <Link
                  key={article._id}
                  to={`/articles/${article._id}`}
                  className="block p-4 hover:bg-gray-200"
                >
                  {article.topic}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="container mx-auto max-w-4xl px-8 mb-4">
        <h2 className="font-bold text-2xl text-center mb-6 ">
          Popular Questions
        </h2>
        <div className="mb-4">
          {loading ? (
            // Skeleton loading for articles
            <div className="grid md:grid-cols-2 gap-4">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {articles.map((article) => (
                <Link
                  to={`/articles/${article._id}`}
                  key={article._id}
                  className=""
                >
                  <h3 className="text-xl font-medium mb-2">{article.topic}</h3>
                  <div
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: article.content.slice(0, 100) + '...',
                    }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="container mx-auto max-w-4xl px-8">
        <h2 className="font-bold text-2xl text-center mb-6 ">Learn More</h2>
        <div className="mb-4">
          {loading ? (
            // Skeleton loading for categories
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <h3
                  key={category}
                  className="text-xl font-medium border-gray-300 p-4 rounded-lg shadow-md text-center"
                >
                  {category}
                </h3>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Articles;
