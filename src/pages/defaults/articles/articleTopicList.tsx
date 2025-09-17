import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useTheme from "../../../hooks/useTheme"
import useArticle from "../../../hooks/useArticle"
import { Article } from "../../../types/article"

export default function ArticleTopicListScreen() {
  const { isDarkMode } = useTheme()
  const { topic } = useParams<{ topic: string }>()

  const { loading, fetchArticleByCategory } = useArticle()

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [articles, setArticles] = useState<Article[]>([])

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) =>
        article.topic.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [articles, searchQuery]
  )

  useEffect(() => {
    const searchArticles = async () => {
      try {
        const filteredArticles = await fetchArticleByCategory(topic!)
        setArticles(filteredArticles)
      } catch (error) {
        console.log("Error searching articles")
      }
    }

    searchArticles()
  }, [])

  const SkeletonLoader = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-4 w-3/4 mb-2 bg-gray-300 rounded"></div>
      <div className="h-4 w-full mb-2 bg-gray-300 rounded"></div>
      <div className="h-4 w-5/6 mb-2 bg-gray-300 rounded"></div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex justify-between items-center mb-5 md:flex-col">
        <h1 className="text-4xl font-bold text-center mb-5 md:text-3xl">
          {topic}
        </h1>
        <div className="flex items-center mb-2.5 border border-gray-300 rounded-2xl overflow-hidden w-70">
          <FontAwesomeIcon icon={faSearch} className="mx-2.5" />
          <input
            type="search"
            placeholder="Search articles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-2 py-2 text-sm border-none w-full bg-transparent ${
              isDarkMode ? "text-white" : "text-black"
            } focus:outline-none md:w-auto md:mb-0 md:ml-2.5`}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
        {loading ? (
          <SkeletonLoader />
        ) : (
          filteredArticles.map((article) => (
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
          ))
        )}
      </div>
    </div>
  )
}
