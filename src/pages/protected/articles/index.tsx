import useArticle from "../../../hooks/useArticle";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Article } from "../../../types/article";

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg p-4">
    <div className="h-4 w-3/4 mb-2 bg-gray-300 rounded"></div>
    <div className="h-4 w-full mb-2 bg-gray-300 rounded"></div>
    <div className="h-4 w-5/6 mb-2 bg-gray-300 rounded"></div>
  </div>
);

const ArticleList = () => {
  const { articles, loading, deleteArticle } = useArticle();
  const [activeComponent] = useState("list");

  const handleDeleteClick = async (article: Article) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this article?"
    );
    if (confirmDelete) {
      deleteArticle(article._id);
    }
  };

  return (
    <div className=" px-4 md:px-8 mb-4 mt-4 md:mt-10">
      {activeComponent === "list" && (
        <>
          <section className="mt-10">
            <div className="flex flex-row mb-4 justify-between items-center">
              <h2 className="font-bold text-2xl ">Article List</h2>
              <div className=" ">
                <Link
                  to="/admin/create-article"
                  className="p-2 text-lg flex text-white bg-orange-400 rounded hover:bg-red-800"
                >
                  Create Article
                </Link>
              </div>
            </div>
          </section>

          <section className="  px-4 md:px-8 mt-4 md:mt-10">
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
                        <Link
                          to={`/admin/create-article?id=${article._id}`}
                          className="flex items-center text-black hover:text-malon-color mr-4 cursor-pointer"
                        >
                          <FaEdit className="mr-2" /> Edit
                        </Link>
                        <div
                          onClick={() => handleDeleteClick(article)}
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
  );
};

export default ArticleList;
