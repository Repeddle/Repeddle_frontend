import useArticle from "../../../hooks/useArticle"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useState } from "react"

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg p-4">
    <div className="h-4 w-3/4 mb-2 bg-gray-300 rounded"></div>
    <div className="h-4 w-full mb-2 bg-gray-300 rounded"></div>
    <div className="h-4 w-5/6 mb-2 bg-gray-300 rounded"></div>
  </div>
)

const ArticleList = () => {
  const { articles, loading } = useArticle()
  const [activeComponent] = useState("list")

  // const handleCreateArticleClick = () => {
  //   setActiveComponent('createArticle');
  // };

  // const handleEditClick = (article: Article) => {
  //   setActiveComponent('editArticle');
  // };

  // const handleDeleteClick = async (article: Article) => {
  //   const confirmDelete = window.confirm('Do you really want to delete this article?');
  //   if (confirmDelete) {
  //     deleteArticle(article._id);

  //   }
  // }

  return (
    <div className="container mx-auto max-w-4xl px-8 mb-4 mt-10">
      {activeComponent === "list" && (
        <>
          <section className="mt-10">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="font-bold text-2xl mb-6 sm:mb-0">Article List</h2>
              <div className="flex flex-row space-x-4 mt-4 sm:mt-0">
                <button
                  // onClick={handleCreateArticleClick}
                  className="p-2 text-lg flex text-white bg-orange-400 rounded hover:bg-red-800"
                >
                  Create Article
                </button>
              </div>
            </div>
          </section>

          <section className="container mx-auto max-w-4xl px-8 mb-4 mt-10">
            <div className="mb-4">
              {loading ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {articles.map((article) => (
                    <div key={article._id} className="">
                      <h3 className="text-xl font-medium mb-2">
                        {article.topic}
                      </h3>
                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: article.content.slice(0, 100) + "...",
                        }}
                      />
                      <div className="flex items-center mt-2">
                        <div
                          // onClick={() => handleEditClick(article)}
                          className="flex items-center text-black hover:text-malon-color mr-4 cursor-pointer"
                        >
                          <FaEdit className="mr-2" /> Edit
                        </div>
                        <div
                          // onClick={() => handleDeleteClick(article)}
                          className="flex items-center text-black hover:text-malon-color cursor-pointer"
                        >
                          <FaTrash className="mr-2" /> Delete
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* {(activeComponent === 'createArticle' || activeComponent === 'editArticle') && <CreateArticle onCancel={handleCancelCreateArticle} onArticleCreated={handleArticleCreated} article={selectedArticle} />} */}
    </div>
  )
}

export default ArticleList
