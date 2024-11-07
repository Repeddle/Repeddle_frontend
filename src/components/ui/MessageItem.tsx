import { Link } from "react-router-dom"
import MessageImage from "./MessageImage"
import moment from "moment"
import { ConversationMessage } from "../../types/conversation"

type Props = {
  message: ConversationMessage
  own: boolean
  support?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createHtmlFromObjects = (objectArray: any[]) => {
  return objectArray ? (
    objectArray.map((item, index) => {
      if (item.type === "div") {
        return (
          <div className="mb-2.5" key={index}>
            {item.content}
          </div>
        )
      } else if (item.type === "img") {
        return <MessageImage key={index} url={item.content} />
      } else if (item.type === "link") {
        return <Link to={item.href}>{item.content}</Link>
      } else {
        // Handle other types or provide a default case
        return null
      }
    })
  ) : (
    <div>___ No message data ___</div>
  )
}

const MessageItem = ({ message, own, support }: Props) => {
  return (
    <>
      {own ? (
        <>
          <div className="flex mt-[15px] justify-end">
            <div>
              <div
                className={`inline-block text-white rounded-[0.2rem] bg-malon-color p-[5px] ${
                  support ? "lg:p-2.5" : "lg:p-5"
                }`}
              >
                {message.type === "email" ? (
                  createHtmlFromObjects(message.emailMessages)
                ) : (
                  <div>
                    {message.image && <MessageImage url={message.image} />}
                    {message.text}
                  </div>
                )}
              </div>
              <div className="text-right text-[13px]">
                {moment(message.createdAt).fromNow()}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex my-[15px] justify-start">
          <div>
            <div
              className={`inline-block text-white rounded-[0.2rem] p-[5px] ${
                support ? "lg:p-2.5" : "lg:p-5"
              }`}
            >
              {message.type === "email" ? (
                createHtmlFromObjects(message.emailMessages)
              ) : (
                <div>
                  {message.image && <MessageImage url={message.image} />}
                  {message.text}
                </div>
              )}
            </div>
            <div className="text-right text-[13px]">
              {moment(message.createdAt).fromNow()}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageItem
