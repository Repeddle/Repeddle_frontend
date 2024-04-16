import { useState } from "react"
import { FaTimes } from "react-icons/fa"

type Props = {
  url: string
}

const MessageImage = ({ url }: Props) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <img
        className="block max-w-[150px]"
        src={url}
        alt="img"
        onClick={() => setShow(true)}
      />
      {show && (
        <div className="z-[9] fixed w-full h-full flex items-center justify-center p-2.5 lg:p-5 left-0 top-0 dark:bg-dark-ev1 bg-light-ev1">
          <div
            className="absolute w-10 h-10 flex justify-center items-center cursor-pointer rounded-[50%] right-5 top-5"
            onClick={() => {
              setShow(false)
            }}
          >
            <FaTimes className="text-black" />
          </div>
          <img
            className="lg:max-h-full max-h-[auto] max-w-full"
            src={url}
            alt="img"
          />
        </div>
      )}
    </div>
  )
}

export default MessageImage
