import React, { useState } from "react";

interface Option {
 value: string;
 label: string;
 description: string;
 details: string;
}

const options: Option[] = [
 {
    value: "new",
    label: "Create from New Topic",
    description: "Create a new article based on a completely new topic.",
    details: "Start from scratch and create an article on a topic that does not exist in the system.",
 },
 {
    value: "existing",
    label: "Create from Existing Topic",
    description: "Create a new article based on an existing topic.",
    details: "Choose a topic that already exists in the system and create an article related to it.",
 },
];

interface CreateScreenProps {
 switchScreen: (screen: string) => void;
}

const CreateScreen: React.FC<CreateScreenProps> = ({ switchScreen }) => {
 const [createOption, setCreateOption] = useState<string>("");

 const handleOptionSelect = (option: string) => {
    setCreateOption(option);
 };

 const handleContinue = () => {
    if (createOption === "new") {
      switchScreen("newtopic");
    } else if (createOption === "existing") {
      switchScreen("selecttopic");
    }
 };

 const handleCancel = () => {
    switchScreen("list");
 };

 return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-xl mb-5">Create Article</h2>
      <p className="text-lg mb-5">Select an option to create the article:</p>
      <div className="flex flex-col md:flex-row justify-center mb-5">
        {options.map((option) => (
          <button
            key={option.value}
            className={`relative px-5 py-2 text-sm font-medium mx-2 my-1 ${
              createOption === option.value ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            } border border-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white`}
            onClick={() => handleOptionSelect(option.value)}
          >
            <div className="font-bold">{option.label}</div>
            <div className="text-sm text-gray-500 mt-2">{option.description}</div>
            <div className="text-sm text-gray-500 mt-2">{option.details}</div>
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-md cursor-pointer mr-5"
          disabled={!createOption}
          onClick={handleContinue}
        >
          Continue
        </button>
        <button
          className="px-5 py-2 text-sm font-medium text-blue-500 bg-white border border-blue-500 rounded-md cursor-pointer"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
 );
};

export default CreateScreen;
