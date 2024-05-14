import React, { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

interface IMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isSentByCurrentUser: boolean; // New property to identify sent messages
}

// Sample data for messages
const messages: IMessage[] = [
  {
    id: 1,
    sender: "Alice",
    content: "Hi there!",
    timestamp: "10:00 AM",
    isSentByCurrentUser: false,
  },
  {
    id: 2,
    sender: "Bob",
    content: "Hey!",
    timestamp: "10:02 AM",
    isSentByCurrentUser: true,
  },
  {
    id: 1,
    sender: "Alice",
    content: "How are you doing",
    timestamp: "10:03 AM",
    isSentByCurrentUser: false,
  },
  {
    id: 2,
    sender: "Bob",
    content: "I am good.",
    timestamp: "10:04 AM",
    isSentByCurrentUser: true,
  },
  // Add more sample messages here
];

interface IConversation {
  user: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages?: number;
}

// Sample data for messages
const conversations: IConversation[] = [
  {
    user: "Alice",
    lastMessage: "Hi there!",
    lastMessageTime: "10:00 AM",
    unreadMessages: 2,
  },
  {
    user: "Bob",
    lastMessage: "Hey!",
    lastMessageTime: "10:02 AM",
    unreadMessages: 1,
  },
  // Add more sample conversations here
];

const Message: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTab, setCurrentTab] = useState("chat");
  const [currentConversation, setCurrentConversation] =
    useState<IConversation | null>(null);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sending message logic
    setMessageInput("");
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="flex h-screen bg-light-ev4 dark:bg-dark-ev4"
      style={{ maxHeight: `calc(100vh - 160px)` }}
    >
      <div className="w-[4.5%]">
        <div
          onClick={() => setCurrentTab("chat")}
          className={`${
            currentTab === "chat" && "bg-light-ev2 dark:bg-dark-ev2"
          } py-4 flex justify-center hover:bg-light-ev3 hover:dark:bg-dark-ev3 cursor-pointer`}
        >
          <IoChatbubbleEllipsesOutline size={30} />
        </div>
        <div
          onClick={() => setCurrentTab("support")}
          className={`${
            currentTab === "support" && "bg-light-ev2 dark:bg-dark-ev2"
          } py-4 flex justify-center hover:bg-light-ev3 hover:dark:bg-dark-ev3 cursor-pointer`}
        >
          <BiSupport size={30} />
        </div>
        <div
          onClick={() => setCurrentTab("report")}
          className={`${
            currentTab === "report" && "bg-light-ev2 dark:bg-dark-ev2"
          } py-4 flex justify-center hover:bg-light-ev3 hover:dark:bg-dark-ev3 cursor-pointer`}
        >
          <MdReport size={30} />
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-1/4 bg-light-ev2 dark:bg-dark-ev2 ">
        <div className="p-4">
          {/* Sidebar content */}
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          {/* Search input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full mb-4 px-3 py-2 border border-opacity-50 dark:bg-black border-gray-300 rounded-md focus:outline-none focus:border-orange-color"
          />
        </div>
        <div className="overflow-y-auto">
          {/* Conversation list */}
          {filteredConversations.map((conversation, index) => (
            <div
              key={index}
              className={`flex items-center py-2 px-4 cursor-pointer transition-colors duration-300 ${
                conversation.user === currentConversation?.user &&
                "bg-light-ev1 dark:bg-dark-ev1"
              } hover:bg-light-ev3 dark:hover:bg-dark-ev3 `}
              onClick={() => setCurrentConversation(conversation)}
            >
              {/* User image */}
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              {/* User details and last message */}
              <div className="flex-1">
                <div className="font-semibold">{conversation.user}</div>
                <div className="text-sm text-gray-600">
                  {conversation.lastMessage}
                </div>
              </div>
              {/* Last message time and unread messages */}
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-600">
                  {conversation.lastMessageTime}
                </div>
                {conversation.unreadMessages && (
                  <div className="bg-orange-color text-white text-xs rounded-full px-2 py-1 mt-1">
                    {conversation.unreadMessages}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-light-ev1 dark:bg-dark-ev1">
        {/* Header */}
        <div className="bg-light-ev4 dark:bg-dark-ev4 px-4 py-2">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
            <div className="font-semibold">Bob</div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 py-4 px-10 overflow-y-auto">
          {/* Chat content */}
          {messages.slice().map((message) => (
            <div
              key={message.id}
              className={`flex  mb-4 ${
                message.isSentByCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex mb-1">
                {!message.isSentByCurrentUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                )}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.isSentByCurrentUser
                    ? "bg-orange-color text-white self-end"
                    : "bg-malon-color text-white self-start"
                }`}
              >
                {message.content}
                <span className="text-white text-opacity-75 w-full text-xs mr-auto">
                  <div>{message.timestamp}</div>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={handleMessageSubmit}
          className="p-4 border-t border-gray-300 flex items-center gap-4 border-opacity-50"
        >
          <FaImage size={30} />
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full border border-opacity-50 dark:bg-black rounded-lg p-3 border-gray-300  focus:outline-none focus:border-orange-color"
          />
          <button type="submit" className="">
            <IoSend size={30} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
