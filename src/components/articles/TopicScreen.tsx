// TopicScreen.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopicScreen: React.FC<{
  switchScreen: (screen: string) => void;
  setTopic: (topic: string) => void;
}> = ({ switchScreen, setTopic }) => {
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data } = await axios.get('/api/articles/topics');
        setTopics(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []);

  const handleClick = (topic: string) => {
    setTopic(topic);
    switchScreen('newtopic');
  };

  const handleCancel = () => {
    switchScreen('create');
  };

  return (
    <div className="max-w-800 mx-auto p-20">
      <h2 className="text-2xl font-bold mb-8">Topics</h2>
      <div className="grid grid-cols-3 gap-20 md:grid-cols-1 md:gap-10">
        {topics.map((topic) => (
          <div
            key={topic}
            className="text-center border rounded p-4 hover:text-orange-500 cursor-pointer"
            onClick={() => handleClick(topic)}
          >
            {topic}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <div
          className="border border-red-700 rounded px-4 py-2 cursor-pointer"
          onClick={handleCancel}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default TopicScreen;
