import { ChangeEvent, MouseEvent, useRef, useState } from "react"
import { FaAngleLeft, FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { FaMessage } from "react-icons/fa6"
import Conversation from "../../components/Conversation"
import {
  conversationData,
  conversationMessageData,
  productDetails,
  searchResultData,
  user as userData,
} from "../../utils/data"
import { IConversation } from "../../types/conversation"
import MessageItem from "../../components/ui/MessageItem"

function Message() {
  const { user: userInfo } = useAuth()

  const user1 = userData
  const user2 = userData
  const conversations = conversationData
  const loadingx = false

  const [currentChat, setCurrentChat] = useState<IConversation>()
  const [showLeft, setShowLeft] = useState(true)
  const [searchResult, setSearchResult] = useState(searchResultData)
  const product = productDetails
  const messages = conversationMessageData

  const scrollref = useRef(null)
  const searchRef = useRef(null)

  const closeModel = (e: MouseEvent<HTMLDivElement>) => {
    // TODO:
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (searchRef !== e.target) {
      setSearchResult([])
    }
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  return (
    <div
      className="flex-[4] min-w-0 flex gap-2.5 mb-5 mx-5 my-0 bg-light-ev1 dark:bg-dark-ev1"
      onClick={closeModel}
    >
      <div
        className={`flex-1 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2 lg:block ${
          showLeft ? "" : "hidden"
        }`}
      >
        <div className="flex justify-between px-[25px] py-[15px]">
          <div className="relative">
            <FaSearch className="relative pr-2.5" />
            <input
              className={`h-10 px-2.5 py-0 rounded-[0.2rem] border-0 bg-white-color dark:bg-black-color text-black
              dark:text-white focus-visible:outline-none placeholder:pl-2.5 placeholder:text-light-ev4 dark:placeholder:text-dark-ev4`}
              placeholder="Search..."
              onChange={handleSearchInput}
            />

            {searchResult.length > 0 && (
              <div
                className="absolute w-full z-[9] p-[15px] left-0 top-5 bg-white dark:bg-black"
                ref={searchRef}
              >
                {searchResult.map(
                  (u) =>
                    u._id !== userInfo?._id && (
                      <div
                        className="flex items-center cursor-pointer mb-2.5"
                        key={u._id}
                      >
                        <img
                          className="w-5 h-5 mr-2.5 rounded-[50%]"
                          src={u.image}
                          alt="img"
                        />
                        <div>{u.username}</div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
          <div>
            <FaMessage className="relative pr-2.5" />
          </div>
        </div>
        <div className="overflow-auto h-[calc(100%_-_50px)] scrollbar-hide">
          {conversations.length < 1
            ? "No Conversation"
            : conversations.map((c, index) => (
                <div
                  onClick={() => {
                    setShowLeft(false)
                    setCurrentChat(c)
                  }}
                  key={index}
                >
                  <Conversation
                    conversation={c}
                    currentChat={currentChat && currentChat._id}
                  />
                </div>
              ))}
        </div>
      </div>
      <div
        className={`flex-[2] lg:px-[30px] lg:block lg:py-2.5 rounded-[0.2rem] m-[5px] p-2.5 ${
          showLeft ? "hidden" : ""
        }`}
      >
        {currentChat ? (
          <div className="overflow-y-auto h-full scrollbar-hide">
            {!loadingx && (
              <>
                {!showLeft && (
                  <div
                    className="flex lg:hidden bg-light-ev1 dark:bg-dark-ev1 justify-center items-center w-[55px] p-[5px]"
                    onClick={() => setShowLeft(true)}
                  >
                    <FaAngleLeft className="text-[15px] mr-[5px]" />
                    Back
                  </div>
                )}
                <div className="flex justify-between">
                  <Link
                    to={`/seller/${user2._id}`}
                    className="flex justify-end pr-2.5"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 object-cover object-top mr-[0_15px] m-[3px] rounded-[50%]"
                        src={user2.image}
                      />
                      <div>{user2.username}</div>
                    </div>
                  </Link>
                  <Link
                    to={`/seller/${user1._id}`}
                    className="flex justify-end pr-2.5"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 object-cover object-top mr-[0_15px] m-[3px] rounded-[50%]"
                        src={user1.image}
                      />
                      <div>{user1.username}</div>
                    </div>
                  </Link>
                </div>
              </>
            )}
            {currentChat.conversationType !== "user" && (
              <Link
                to={
                  currentChat.conversationType === "reportUser"
                    ? `/seller/${product._id}`
                    : `/product/${product.slug}`
                }
                className="flex justify-center border-b border-b-[gray]"
              >
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 object-cover object-top mr-[0_15px] m-[3px] rounded-[50%]"
                    src={product.images[0]}
                  />
                  <div>{product.name}</div>
                </div>
              </Link>
            )}
            <div className="h-[calc(100%_-_70px)] overflow-y-auto flex flex-col scrollbar-hide">
              <div className="h-full">
                {messages.map((m, index) => (
                  <div ref={scrollref} key={index}>
                    <MessageItem
                      key={m._id}
                      own={m.sender === user1._id}
                      message={m}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <span className="flex justify-center items-center text-[50px] text-[rgba(99,91,91,0.2)] text-center">
            Select a conversation to start a chat
          </span>
        )}
      </div>
    </div>
  )
}

export default Message
