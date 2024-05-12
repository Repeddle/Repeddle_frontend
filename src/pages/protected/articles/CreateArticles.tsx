import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Article } from "../../../types/article";

const CreateArticle = ({ onCancel, article }: { onCancel: () => void, article: Article | null }) => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (article) {
      setValue(article.content);
      setCategory(article.topic);
    }
  }, [article]);

  const createArticle = async (category: string, content: string) => {
    // Make an API request to your backend server to create the article
    // This is just a placeholder and should be replaced with your actual API request
    console.log(`Creating article with category: ${category} and content: ${content}`);
  };

  const handleContinueClick = () => {
    createArticle(category, value);
  };

  const handleCancelClick = () => {
    onCancel(); // Use the passed function to handle cancel
  };

  return (
    <div className="container mx-auto max-w-4xl px-8 mb-4 mt-10 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-2xl mb-6 sm:mb-0">
          {article ? 'Edit Article' : 'Create Article'}
        </h2>
        <div className="flex space-x-3">
          <button onClick={handleContinueClick} className="p-2 text-lg flex text-white bg-orange-400 rounded hover:bg-red-800">
            Submit
          </button>
          <button onClick={handleCancelClick} className="p-2 text-lg flex text-white bg-orange-400 rounded hover:bg-red-800">
            Back
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-red-700 sm:text-sm"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  )
}

export default CreateArticle
