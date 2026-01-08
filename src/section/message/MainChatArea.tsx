import React, { ChangeEvent, useState } from "react";
import moment from "moment";
import { SkeletonMessageLoading } from "../../components/message/skeletonLoading";
import useMessage from "../../hooks/useMessage";
import useAuth from "../../hooks/useAuth";
import { FaFlag, FaShieldAlt } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import socket from "../../socket";
import { CgChevronLeft, CgUnblock } from "react-icons/cg";
import { getDayLabel } from "../../utils/chat";
import { compressImageUpload } from "../../utils/common";
import useToastNotification from "../../hooks/useToastNotification";
import { baseURL, imageUrl } from "../../services/api";
import LoadingBox from "../../components/LoadingBox";
import { IoMdClose } from "react-icons/io";
import ImageModal from "../../components/ImageModal";
import Button from "../../components/ui/Button";
import Report from "../product/Report";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { BiDotsHorizontal } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import { useModeration } from "../../hooks/useModeration";

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
}
const MainChatArea: React.FC<Props> = ({ setIsSidebarOpen }) => {
  const { user } = useAuth();
  const {
    loadingMessage,
    messages,
    isTypingList,
    currentConversation,
    setCurrentConversation,
    isAnimating,
    sendMessage,
    joinConversation,
    leaveConversation,
    blockUser,
    unblockUser,
  } = useMessage();
  const { addNotification } = useToastNotification();
  const [messageInput, setMessageInput] = useState<string>("");
  const [sending, setSending] = useState({
    value: false,
    image: "",
    message: "",
    failed: false,
  });

  const { checkRestricted } = useModeration();
  const foundRestricted = messageInput ? checkRestricted(messageInput) : [];

  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportItem, setReportItem] = useState({
    id: "",
    image: "",
    name: "",
    refs: "conversation" as any,
  });

  // Function to emit startTyping event
  const startTyping = () => {
    socket.emit("typing", {
      conversationId: currentConversation?._id,
      userId: user?._id,
    });
  };

  // Function to emit stopTyping event
  const stopTyping = () => {
    socket.emit("stopTyping", {
      conversationId: currentConversation?._id,
      userId: user?._id,
    });
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sending message logic
    if (!currentConversation) return;
    if (!messageInput && !image) return;
    try {
      setSending({ value: true, image, message: messageInput, failed: false });
      setMessageInput("");
      setImage("");
      await sendMessage({
        image: image,
        content: messageInput,
        type: "Chat",
        conversationId: currentConversation._id,
      });
      setSending({ value: false, image: "", message: "", failed: false });
    } catch (error: any) {
      console.log(error);
      addNotification(error, undefined, true);
      setSending((prev) => ({ ...prev, value: true, failed: true }));
    }
  };

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

  const handleImageClick = (imageSrc: string) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  const [joining, setJoining] = useState(false);
  const handleJoin = async () => {
    try {
      if (!currentConversation) return;
      setJoining(true);
      await joinConversation(currentConversation?._id);
    } catch (error: any) {
      addNotification(error, undefined, true);
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    try {
      if (!currentConversation) return;
      setJoining(true);
      await leaveConversation(currentConversation?._id);
    } catch (error: any) {
      addNotification(error, undefined, true);
    } finally {
      setJoining(false);
    }
  };

  const handleBlock = async (id: string) => {
    try {
      if (!currentConversation) return;
      await blockUser(id);
      addNotification("User blocked");
    } catch (error: any) {
      addNotification(error, undefined, true);
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      if (!currentConversation) return;
      await unblockUser(id);
      addNotification("User unblocked");
    } catch (error: any) {
      addNotification(error, undefined, true);
    }
  };

  return currentConversation ? (
    <>
      <div className=" relative flex-1 w-screen overflow-x-hidden flex flex-col bg-light-ev1 dark:bg-dark-ev1">
        {/* Header */}
        <div className="bg-light-ev4 dark:bg-dark-ev4 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <CgChevronLeft
              size={30}
              onClick={() => {
                setIsSidebarOpen(true);
                setCurrentConversation(null);
              }}
              className="mr-4 md:hidden"
            />
            <div className="flex items-center ">
              <img
                className="w-10 h-10 rounded-full bg-gray-300 mr-4"
                src={currentConversation.otherUser?.image}
                alt={currentConversation.otherUser?.username}
              />
              <div className="font-semibold">
                {currentConversation.otherUser?.username}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10">
            {user?.role === "Admin" &&
              (currentConversation.type === "Support" ||
                currentConversation.type === "Report") &&
              (currentConversation.participants.includes(user._id) ? (
                <Button
                  text="leave"
                  onClick={handleLeave}
                  isLoading={joining}
                />
              ) : (
                <Button text="Join" onClick={handleJoin} isLoading={joining} />
              ))}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <BiDotsHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white-color dark:bg-black-color"
                align="start"
              >
                <DropdownMenuGroup>
                  {user?.blockedUsers.includes(
                    currentConversation.otherUser?._id || ""
                  ) ? (
                    <DropdownMenuItem
                      onClick={() =>
                        handleUnblock(currentConversation.otherUser?._id || "")
                      }
                    >
                      <CgUnblock /> Unblock
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() =>
                        handleBlock(currentConversation.otherUser?._id || "")
                      }
                    >
                      <MdBlock /> Block
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      setShowReport(true);
                      setReportItem({
                        id: currentConversation._id,
                        image: currentConversation.otherUser?.image || "",
                        name: currentConversation.otherUser?.username || "",
                        refs: "conversation",
                      });
                    }}
                  >
                    <FaFlag /> Report
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="absolute z-0 flex items-center justify-center top-16 opacity-40 gap-5 px-10 md:px-20">
          <div>
            <FaShieldAlt size={25} />
          </div>
          <div className="text-center text-xs ">
            Kind Reminder: To make sure you're covered by Repeddle Buyer's &
            Seller's Protection, all payments must be made using Repeddle's App
            and Website complete CHECKOUT system.
          </div>
        </div>

        {/* Chat Window */}
        {isAnimating && (
          <div className="absolute inset-0 bg-white opacity-20 z-20"></div>
        )}

        <div
          className={`flex-1 z-10 pbs-1 pt-20 px-4 md:px-10 overflow-y-auto flex flex-col-reverse transition-transform duration-500 ${
            isAnimating ? "-translate-y-7" : "translate-y-0"
          }`}
          style={{ scrollBehavior: "smooth" }}
        >
          {isTypingList.find((type) => type.id === currentConversation._id) && (
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
                  {sending.image && (
                    <img
                      src={imageUrl + sending.image}
                      className="object-contain max-w-full h-auto "
                      onClick={() => handleImageClick(imageUrl + sending.image)}
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
          {loadingMessage ? (
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
                      <div className="text-center my-2 flex justify-center items-center">
                        <div className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-md">
                          {getDayLabel(message.createdAt)}
                        </div>
                      </div>
                    )}
                    {message.isInfo ? (
                      <div className="text-sm py-2 text-center opacity-70">
                        {message.content}
                      </div>
                    ) : (
                      <div
                        className={`flex  mb-4 ${
                          message.sender === user?._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="flex mb-1">
                          {message.sender !== user?._id && (
                            <img
                              className="w-8 h-8 rounded-full bg-gray-300 mr-2"
                              src={currentConversation.otherUser?.image}
                              alt={currentConversation.otherUser?.username}
                            />
                          )}
                        </div>
                        <div
                          className={`p-1 rounded-lg  max-w-[80%]  ${
                            message.sender === user?._id
                              ? "bg-orange-color text-white self-end"
                              : "bg-malon-color text-white self-start"
                          }`}
                        >
                          {message.image && (
                            <img
                              src={imageUrl + message.image}
                              className="object-contain max-w-full h-auto "
                              onClick={() =>
                                handleImageClick(imageUrl + message.image)
                              }
                            />
                          )}
                          <div className="break-words">{message.content}</div>
                          <span className="text-white text-opacity-75 w-full text-xs text-end">
                            <div>{moment(message.createdAt).format("LT")}</div>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>

        {image && (
          <div className="flex items-center justify-between bg-light-ev4 dark:bg-dark-ev4 w-full z-20 p-2 px-4">
            <img
              src={baseURL + image}
              className="w-10 h-10 object-cover"
              onClick={() => handleImageClick(baseURL + image)}
            />

            <IoMdClose
              size={24}
              className="cursor-pointer"
              onClick={() => setImage("")}
            />
          </div>
        )}
        {/* Message Input Box */}
        <form
          onSubmit={handleMessageSubmit}
          className="relative p-4 border-t border-gray-300 flex items-center gap-4 border-opacity-50"
        >
          <label htmlFor="upload">
            {uploading ? (
              <LoadingBox size="md" />
            ) : (
              <RiImageAddFill size={30} className="cursor-pointer" />
            )}
            <input
              type="file"
              id="upload"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
              startTyping();
            }}
            placeholder="Type a message..."
            className="border border-opacity-50 flex-1 dark:bg-black rounded-lg p-3 border-gray-300  focus:outline-none focus:border-orange-color"
            onFocus={startTyping}
            onBlur={stopTyping}
          />
          {foundRestricted.length > 0 && (
            <div className="absolute top-[-25px] left-[60px] text-[10px] text-orange-500 font-semibold">
              Warning: Restricted words found: {foundRestricted.join(", ")}.
              Message will be flagged for review.
            </div>
          )}
          <button type="submit" className="">
            <IoSend size={30} />
          </button>
        </form>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={modalImage}
        alt="Chat image"
      />
      <Report
        reportItem={reportItem}
        refs={reportItem.refs}
        setShowModel={setShowReport}
        showModel={showReport}
      />
    </>
  ) : (
    <div className="flex-1 flex justify-center items-center bg-light-ev1 dark:bg-dark-ev1 font-bold text-5xl opacity-30">
      Select a conversation to start a chat
    </div>
  );
};

export default MainChatArea;
