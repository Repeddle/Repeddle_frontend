import { useRef, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useArticle from "../../hooks/useArticle";
import { RiCustomerService2Fill } from "react-icons/ri";
import { CgChevronDown, CgChevronRight } from "react-icons/cg";
import { HiOutlineSearch } from "react-icons/hi";
import { GrAttachment } from "react-icons/gr";

export default function Support() {
  const { user } = useAuth();
  const { articles } = useArticle();
  const [showSupport, setShowSupport] = useState(false);
  const [input, setInput] = useState({ username: "", email: "" });
  const [error, setError] = useState({ username: "", email: "" });
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState<any>();
  const scrollref = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const [image, setImage] = useState<string>("");
  const location = useLocation();
  const [uploadImage, setUploadImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const CurrentPath = location.pathname;

  const [sendMessage, setSendMessage] = useState(false);

  const handleOnChange = (text: string, input: string) => {
    setInput((prevState) => ({ ...prevState, [input]: text.trim() }));
  };
  const handleError = (errorMessage: string, input: string) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleGuest = async () => {
    if (!input.username) {
      handleError("Please enter your name", "username");
      return;
    }
    if (!input.email) {
      handleError("Please enter an email", "email");
      return;
    }
  };

  const addConversation = async (user: any) => {};

  const [sendingMessage, setSendingMessage] = useState(false);

  const handleSubmit = async (e: FormEvent) => {};

  const handleSendMessage = async () => {
    if (user) {
      await addConversation(user);
    }
    setSendMessage(true);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !sendingMessage) {
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
  };

  if (CurrentPath === "/brand" || CurrentPath === "/newproduct") return null;

  return (
    <div
      className={`hidden lg:block fixed bottom-0 right-5 lg:right-10 ${
      }`}
    >
      <div className="fixed z-50 right-10 bottom-0">
        {showSupport ? (
          <div
            className={`block h-full p-2 lg:rounded-md shadow-2xl shadow-gray-500 overflow-hidden flex-col bg-mainGray dark:bg-gray-500"
            }`}
            style={{ height: "65vh", width: "18rem" }}
          >
            <div className="flex items-center justify-between">
              <RiCustomerService2Fill
                className="text-gray-700 w-10 h-10 p-1"
                size={20}
              />
              <span className="text-lg font-bold text-gray-700">
                Online Support
              </span>
              <CgChevronDown
                onClick={() => setShowSupport(false)}
                className="text-gray-700 w-6 h-6 cursor-pointer"
                size={20}
              />
            </div>
            {!user && (
              <div className="text-gray-700 text-xs my-2">
                <h1>Customer Support Service</h1>
                <div className="py-2">
                  <input
                    className={`text-xs p-1 w-full rounded ${
                      error.username ? "border-red-500" : ""
                    }`}
                    placeholder="Username"
                    type="text"
                    value={input.username}
                    onChange={(e) => handleOnChange(e.target.value, "username")}
                  />
                  {error.username && (
                    <div className="text-red-500 text-xs">{error.username}</div>
                  )}
                </div>
                <div className="py-2">
                  <input
                    className={`text-xs p-1 w-full rounded ${
                      error.email ? "border-red-500" : ""
                    }`}
                    placeholder="Email"
                    type="email"
                    value={input.email}
                    onChange={(e) => handleOnChange(e.target.value, "email")}
                  />
                  {error.email && (
                    <div className="text-red-500 text-xs">{error.email}</div>
                  )}
                </div>
                <div className="py-2">
                  <button
                    className="w-full p-1 bg-gray-600 text-white rounded"
                    onClick={handleGuest}
                  >
                    Join as a Guest
                  </button>
                </div>
              </div>
            )}
            {user && (
              <>
                <div className="py-2">
                  <input
                    className="text-xs p-1 w-full rounded"
                    placeholder="Search Articles"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <HiOutlineSearch className="w-5 h-5 text-gray-700 absolute right-5 top-4" />
                </div>
                {articles.length > 0 && (
                  <div className="overflow-auto h-36">
                    {articles.map((article) => (
                      <div key={article._id} className="py-1">
                        <Link
                          to={`/article/${article.id}`}
                          className="text-xs text-gray-700"
                        >
                          {article.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                <div className="overflow-auto h-36">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollref}>
                      {/* <Messages message={m} own={m.sender === user._id} /> */}
                    </div>
                  ))}
                </div>
                {sendMessage && (
                  <div className="flex items-center justify-between">
                    <GrAttachment
                      className="w-6 h-6 text-gray-700 cursor-pointer"
                      onClick={() => setUploadImage(true)}
                    />
                    <input
                      type="file"
                      className="hidden"
                      id="file"
                      onChange={handleImageUpload}
                    />
                    <input
                      className="w-full text-xs p-1 rounded"
                      placeholder="Write your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      className="w-8 h-8 p-1 bg-gray-600 text-white rounded flex justify-center items-center"
                      onClick={handleSubmit}
                      disabled={sendingMessage}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center cursor-pointer">
            <div className="p-2 bg-gray-600 rounded-full text-white flex items-center justify-center">
              <RiCustomerService2Fill className="w-6 h-6" />
            </div>
            {/* {supportNotification.length > 0 && (
              <div className="bg-red-600 rounded-full text-white p-1 text-xs">
                {supportNotification.length}
              </div>
            )} */}
            <CgChevronRight
              className="w-6 h-6 text-gray-700 ml-2 cursor-pointer"
              onClick={() => setShowSupport(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
