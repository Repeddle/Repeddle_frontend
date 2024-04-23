/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Article {
  _id: string;
  question: string;
  content: any[]; // Assuming content is an array, adjust the type as needed
}

interface State {
  userInfo: any; // Replace 'any' with the actual type of userInfo
  // Add other state properties as needed
}

interface StoreContext {
  state: State;
  dispatch: React.Dispatch<any>; // Replace 'any' with the actual action type if you have one
}

interface ArticleListScreenProps {
  switchScreen: (screen: string) => void;
  setTopic: (topic: string) => void;
  setQuestion: (question: string) => void;
  setEditId: (id: string) => void;
}

export const Store = React.createContext<StoreContext | undefined>(undefined);

// In your component, you can now use the StoreContext type
const { state, dispatch: ctxDispatch } = useContext(Store) as StoreContext;

const ArticleListScreen: React.FC<ArticleListScreenProps> = ({
  switchScreen,
  setTopic,
  setQuestion,
  setEditId,
}) => {
  const { userInfo } = state;
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get("/api/articles");
        console.log(data);
        setArticles(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, []);

  const getFirstParagraphContent = (content: any[]) => {
    const paragraph = content.find((item) => item.type === "paragraph");
    if (paragraph) {
      return paragraph.content.substring(0, 100);
    }
    return "";
  };

  const handleArticleClick = (articleId: string) => {
    navigate(`/article/${articleId}`);
  };

  const handleEditClick = (article: Article) => {
    setEditId(article._id);
    setTopic(article.question);
    setQuestion(article.question); // Assuming you want to set the question as the topic, adjust as needed
    switchScreen("newtopic");
  };

  const handleDeleteClick = async (articleId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      try {
        await axios.delete(`/api/articles/${articleId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        ctxDispatch({
          type: "SHOW_TOAST",
          payload: {
            message: "Article deleted Successfully",
            showStatus: true,
            state1: "visible1 success",
          },
        });
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        );
      } catch (error) {
        console.log(error);
        ctxDispatch({
          type: "SHOW_TOAST",
          payload: {
            message: getError(error),
            showStatus: true,
            state1: "visible1 error",
          },
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Article List</h2>
      <button
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 mb-4"
        onClick={() => switchScreen("create")}
      >
        Create New Article
      </button>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
        {articles.map((article) => (
          <div key={article._id} className="mb-4 cursor-pointer">
            <div
              onClick={() => handleArticleClick(article._id)}
              className="flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{article.question}</h3>
              <p className="text-sm">
                {getFirstParagraphContent(article.content)}...
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-gray-500 hover:text-red-500 flex items-center"
                onClick={(_e) => handleEditClick(article)}
              >
                <FaEdit />
                Edit
              </button>
              <button
                className="text-gray-500 hover:text-red-500 flex items-center"
                onClick={(_e) => handleDeleteClick(article._id)}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleListScreen;
function getError(_error: unknown) {
    throw new Error("Function not implemented.");
}

