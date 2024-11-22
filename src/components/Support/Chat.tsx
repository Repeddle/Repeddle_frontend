import React, { ChangeEvent, useEffect, useState } from "react";
import Textarea from "../Textarea";
import { FaPaperPlane } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { SkeletonMessageLoading } from "../message/skeletonLoading";
import useMessage from "../../hooks/useMessage";
import { getDayLabel } from "../../utils/chat";
import moment from "moment";
import { IUser } from "../../types/user";
import { getConversationsService } from "../../services/message";
import { compressImageUpload } from "../../utils/common";
import useToastNotification from "../../hooks/useToastNotification";
import { IoMdClose } from "react-icons/io";
import { baseURL, imageUrl } from "../../services/api";
import LoadingBox from "../LoadingBox";
import useAuth from "../../hooks/useAuth";

interface ChatProps {
  user: IUser | null;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const {
    loadingMessage,
    messages,
    isTypingList,
    currentConversation,
    setCurrentConversation,
    isAnimating,
    sendMessage,
  } = useMessage();
  const { user: loginUser } = useAuth();
  const { addNotification } = useToastNotification();
  const [messageInput, setMessageInput] = useState<string>("");
  const [sending, setSending] = useState({
    value: false,
    image: "",
    message: "",
    failed: false,
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await getConversationsService("Support");
        setCurrentConversation(res[0] || null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        addNotification(error as string);
      }
    };
    getConversations();
  }, []);

  const handleRetry = () => {
    setMessageInput(sending.message);
    setImage(sending.image);
    setSending((prev) => ({
      ...prev,
      value: false,
      failed: false,
      message: "",
    }));
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sending message logic
    if (!messageInput && !image) return;
    try {
      setSending({ value: true, image, message: messageInput, failed: false });
      setMessageInput("");
      setImage("");
      await sendMessage({
        image,
        content: messageInput,
        type: "Support",
        conversationId: currentConversation?._id,
      });
      setSending({ value: false, image: "", message: "", failed: false });
    } catch (error) {
      console.log(error);
      setSending((prev) => ({ ...prev, value: true, failed: true }));
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      setImage(imageUrl);

      addNotification("Image uploaded");
    } catch (err) {
      addNotification("Failed uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden   text-black">
      <div
        className={`pb-1 pt-2 px-5  overflow-y-auto flex flex-col-reverse transition-transform duration-500 ${
          isAnimating ? "-translate-y-7" : "translate-y-0"
        }`}
        style={{ scrollBehavior: "smooth", height: "calc(100% - 48px)" }}
      >
        {isTypingList.find((type) => type.id === currentConversation?._id) && (
          <div className="flex justify-start">
            <div className=" flex items-center space-x-2 bg-black dark:bg-white opacity-30 p-4 rounded-full  ">
              <div className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce delay-1500"></div>
              <div className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce delay-400"></div>
            </div>
          </div>
        )}
        {sending.value && (
          <div>
            <div
              className={`flex  mb-4 justify-end
                      `}
            >
              <div
                className={`p-3 rounded-lg bg-orange-color text-white self-end
                        `}
              >
                {" "}
                {sending.image && (
                  <img
                    src={imageUrl + sending.image}
                    className="object-contain max-w-full h-auto "
                  />
                )}
                {sending.message}
                <span className="text-white text-opacity-75  text-end w-full text-xs ">
                  {sending.failed ? (
                    <div className="text-red-500">
                      Failed{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={handleRetry}
                      >
                        Retry
                      </span>
                    </div>
                  ) : (
                    <div className="animate-pulse">Sending</div>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Chat content */}
        {loadingMessage || loading ? (
          <>
            <SkeletonMessageLoading />
          </>
        ) : (
          messages
            .slice()
            .reverse()
            .map((message, index, array) => {
              const prevMessage = array[index + 1];
              const showDayLabel =
                !prevMessage ||
                getDayLabel(message.createdAt) !==
                  getDayLabel(prevMessage.createdAt);

              return (
                <div key={message._id}>
                  {showDayLabel && (
                    <div className="text-center my-2 text-gray-500">
                      {getDayLabel(message.createdAt)}
                    </div>
                  )}
                  <div
                    className={`flex  mb-4 ${
                      message.sender === user?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex mb-1">
                      {message.sender !== user?._id && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === user?._id
                          ? "bg-orange-color text-white self-end"
                          : "bg-malon-color text-white self-start"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={imageUrl + message.image}
                          className="object-contain max-w-full h-auto "
                        />
                      )}
                      {message.content}
                      <span className="text-white text-opacity-75 w-full text-xs text-end">
                        <div>{moment(message.createdAt).format("LT")}</div>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
      {image && (
        <div className="flex items-center bg-light-ev4 justify-between w-full z-20 p-2 px-4">
          <img src={baseURL + image} className="w-10 h-10 object-cover" />

          <IoMdClose
            size={24}
            className="cursor-pointer"
            onClick={() => setImage("")}
          />
        </div>
      )}
      <form
        onSubmit={handleMessageSubmit}
        className="flex flex-1 items-end p-1"
      >
        <Textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="bg-gray-100 rounded-lg"
          placeholder="Type here..."
        />
        <div className="p-2 flex items-center gap-3">
          {loginUser && (
            <label htmlFor="upload">
              {uploading ? (
                <LoadingBox size="sm" />
              ) : (
                <GrAttachment className="cursor-pointer" />
              )}
              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={(e) => {
                  handleImageUpload(e);

                  e.target.value = "";
                }}
              />
            </label>
          )}
          <button type="submit" className="">
            <FaPaperPlane className="cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
