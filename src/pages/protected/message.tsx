import React, { useEffect, useState } from "react";
import useMessage from "../../hooks/useMessage";
import Tabs from "../../section/message/Tabs";
import Sidebar from "../../section/message/Sidebar";
import MainChatArea from "../../section/message/MainChatArea";
import useAuth from "../../hooks/useAuth";

const Message: React.FC = () => {
  const { user } = useAuth();
  const { currentTab, getConversations } = useMessage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load initial messages or data on component mount
  useEffect(() => {
    getConversations(currentTab);
  }, [currentTab]);

  return (
    <div className="relative flex h-screen bg-light-ev4 dark:bg-dark-ev4 max-h-[calc(100vh-75px)] md:max-h-[calc(100vh-160px)]">
      <div
        className={`absolute md:relative flex w-full h-full  md:w-1/3 transition-transform z-20 duration-300 ease-in-out transform ${
          isSidebarOpen ? `translate-x-0` : `-translate-x-full md:translate-x-0`
        }`}
      >
        {user?.role === "Admin" && <Tabs />}
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <MainChatArea setIsSidebarOpen={setIsSidebarOpen} />
    </div>
  );
};

export default Message;
