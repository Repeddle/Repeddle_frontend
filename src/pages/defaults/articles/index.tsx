/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import useArticle from "../../../hooks/useArticle"
import { Article } from "../../../types/article"
import { Link } from "react-router-dom"

function Articles() {
  const { articles, categories, loading, fetchArticles } = useArticle()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])

  useEffect(() => {
    const searchArticles = async () => {
      if (searchQuery.trim() === "") {
        setFilteredArticles([])
        return
      } else {
        try {
          const filteredArticles = await fetchArticles(searchQuery)
          console.log("art", filteredArticles)
          setFilteredArticles(filteredArticles)
        } catch (error) {
          console.log("Error searching articles")
        }
      }
    }

    searchArticles()
  }, [searchQuery])

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-4 w-3/4 mb-2 bg-gray-300 rounded"></div>
      <div className="h-4 w-full mb-2 bg-gray-300 rounded"></div>
      <div className="h-4 w-5/6 mb-2 bg-gray-300 rounded"></div>
    </div>
  )

  return (
    <div>
      <div className="flex relative flex-col items-center py-10 md:py-20 bg-light-ev2 dark:bg-dark-ev2">
        <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-5">
          How can we help?
        </h1>
        <input
          type="search"
          placeholder="Search articles by topic"
          className="text-base w-full max-w-[300px] focus:outline-0 focus:border-orange-color lg:max-w-[650px] border mb-5 p-2.5 rounded-[30px] border-solid border-[#ddd]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute -translate-x-1/2 w-full md:w-1/2 max-h-[200px] overflow-y-auto bg-[#f0f0f0] border z-10 rounded-[5px] border-solid border-[#ccc] left-2/4 top-full">
          {filteredArticles.length !== 0 &&
            filteredArticles.map((article) => (
              <Link
                key={article._id}
                to={`/articles/${article._id}`}
                className="block p-2.5 text-black hover:bg-[#e0e0e0]"
              >
                {article.topic}
              </Link>
            ))}
        </div>
      </div>

      <div className="max-w-[800px] mx-auto my-0 p-5">
        <h2 className="text-2xl text-center font-bold mb-[30px]">
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
            <div className="grid md:grid-cols-2 gap-2.5">
              {articles.slice(0, 6).map((article) => (
                <div key={article._id} className="mb-1.5">
                  <Link to={`/articles/${article._id}`}>
                    <h3 className="text-xl hover:text-orange-color mb-2">
                      {article.topic}
                    </h3>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: article.content.slice(0, 100) + "...",
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <h2 className="text-2xl text-center font-bold mb-[30px]">Learn More</h2>
      <section className="container mx-auto max-w-4xl px-8">
        <div className="mb-4">
          {loading ? (
            // Skeleton loading for categories
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-5">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-5">
              {categories.map((category: string) => (
                <Link
                  to={`/articles/topic/${category}`}
                  key={category}
                  className="text-xl rounded shadow-[2px_2px_10px_-5px_grey] text-center capitalize mb-2.5 p-5 hover:text-orange-color"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center my-5">
          <p className="mb-4 font-medium">
            More Questions? Go to{" "}
            <Link
              to="/support-articles"
              className="text-orange-color font-black"
            >
              <b>Support Articles</b>
            </Link>
          </p>
          <Link
            to="/contact-us"
            className="inline-block px-6 py-3 text-lg text-white bg-orange-color rounded hover:bg-red-800"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Articles
