/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { Store } from '../../StoreContext';


// Define the types for the props
interface NewTopicScreenProps {
 switchScreen: (screen: string) => void;
 topic: string;
 setTopic: (topic: string) => void;
 question: string;
 setQuestion: (question: string) => void;
 editId: string | null;
 setEditId: (editId: string | null) => void;
}

const NewTopicScreen: React.FC<NewTopicScreenProps> = ({
 switchScreen,
 topic,
 setTopic,
 question,
 setQuestion,
 editId,
 setEditId,
}) => {
    const storeContext = useContext(Store);
    const ctxDispatch = storeContext ? storeContext.dispatch : undefined;
 const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
 };

 const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
 };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic || !question) {
      if (ctxDispatch) { // Add this check
        ctxDispatch({
          type: "SHOW_TOAST",
          payload: {
            message: "Fill all fields",
            showStatus: true,
            state1: "visible1 error",
          },
        });
      }
      return;
    }
    // Save the new topic and perform necessary actions
    // Redirect to the desired screen
    switchScreen("new");
 };

 const handleCancel = () => {
    if (editId) {
      setTopic("");
      setQuestion("");
      setEditId(null);
      switchScreen("list");
    } else {
      switchScreen("create");
    }
 };

 return (
    <div className="max-w-800 mx-auto p-20">
      <h2 className="text-2xl mb-20">Create Article</h2>
      <form onSubmit={handleSubmit} className="flex flex-col mb-20">
        <label className="text-lg mb-8">Topic</label>
        <input
          type="text"
          value={topic}
          onChange={handleTitleChange}
          placeholder="Enter the topic this article belongs to"
          className="p-8 text-sm border border-gray-300 rounded-lg mb-12 transition-colors duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:shadow-outline"
        />
        <label className="text-lg mb-8">Question</label>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter the question you are about to answer"
          className="p-8 text-sm border border-gray-300 rounded-lg mb-12 transition-colors duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:shadow-outline"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-10 py-5 text-lg bg-orange-500 text-white rounded-lg cursor-pointer mr-20 hover:bg-orange-600"
          >
            Continue
          </button>
          <div
            onClick={handleCancel}
            className="px-10 py-5 text-lg bg-white text-orange-500 border border-orange-500 rounded-lg cursor-pointer"
          >
            Back
          </div>
        </div>
      </form>
    </div>
 );
};

export default NewTopicScreen;
