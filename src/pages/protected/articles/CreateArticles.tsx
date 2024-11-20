import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useArticle from "../../../hooks/useArticle";
import { Article } from "../../../types/article";
import { useNavigate, useSearchParams } from "react-router-dom";
import useToastNotification from "../../../hooks/useToastNotification";
import LoadingBox from "../../../components/LoadingBox";

const CreateArticle = () => {
  const { updateArticle, createArticle, fetchArticleById, categories } =
    useArticle();
  const [value, setValue] = useState("");
  const { addNotification } = useToastNotification();
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState<Article | null>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [showNew, setShowNew] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const res = await fetchArticleById(id);
        setArticle(res);
        setValue(res.content);
        setCategory(res.category);
        setTopic(res.topic);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleContinueClick = async () => {
    if (!topic) {
      addNotification("Please enter a topic", undefined, true);
      return;
    }
    if (!category) {
      addNotification("Please select a category", undefined, true);
      return;
    }
    if (!value) {
      addNotification("Please enter an article content", undefined, true);
      return;
    }
    try {
      setLoading(true);
      if (article) {
        await updateArticle(article._id, {
          topic,
          category,
          content: value,
        });
      } else {
        await createArticle({
          topic,
          category,
          content: value,
        });
      }
      navigate("/admin/articlelist");
    } catch (error: any) {
      addNotification(error, undefined, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-8 mb-4 mt-10 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-2xl mb-6 sm:mb-0">
          {article ? "Edit Article" : "Create Article"}
        </h2>
        <div className="flex space-x-3">
          {loading && <LoadingBox />}
          <button
            onClick={handleContinueClick}
            className="p-1 px-4  text-lg flex text-white bg-orange-400 rounded hover:bg-red-800"
            disabled={loading}
          >
            Submit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="p-1 px-4 text-lg flex hover:text-white border border-malon-color text-malon-color rounded hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="block text-sm font-medium text-gray-700 mb-2">
        Select Category
      </div>
      <div className="flex gap-3 items-center flex-wrap mb-4">
        {categories.map((cat) => (
          <div
            onClick={() => setCategory(cat)}
            className={`border border-malon-color text-malon-color px-3 py-1 rounded-md cursor-pointer ${
              cat === category ? "bg-malon-color text-white" : ""
            }`}
          >
            {cat}
          </div>
        ))}
        <div
          onClick={() => {
            setShowNew(!showNew);
            setCategory("");
          }}
          className="font-bold text-malon-color cursor-pointer"
        >
          + Add New
        </div>
      </div>
      {showNew && (
        <input
          type="text"
          className=" block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-red-700 sm:text-sm mb-4 -mt-2"
          placeholder="Enter new category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      )}
      <div className="mb-4">
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Topic
        </label>
        <input
          type="text"
          name="topic"
          id="topic"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-red-700 sm:text-sm"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default CreateArticle;
