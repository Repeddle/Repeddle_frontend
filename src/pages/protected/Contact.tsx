import { useMemo, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import { FaDotCircle, FaEye } from "react-icons/fa"
import Modal from "../../components/ui/Modal"
import ContactMessageDetail from "../../components/ContactMessageDetail"
import { IMessage } from "../../types/message"

const Contact = () => {
  const loading = false

  const [showModel, setShowModel] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<IMessage[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null)

  const messagesPerPage = 20 // You can adjust this number according to your preference.
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage * messagesPerPage < messages.length

  const currentMessages = useMemo(() => {
    const indexOfLastMessage = currentPage * messagesPerPage
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage

    return messages.slice(indexOfFirstMessage, indexOfLastMessage)
  }, [currentPage, messages])

  const handleViewDetails = (message: IMessage) => {
    setSelectedMessage(message)
    setShowModel(true)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleClick = async (id: string) => {
    console.log(id)
  }

  return (
    <div className="flex-[4] mb-5 px-5 py-0">
      <h1 className="text-[calc(1.375rem_+_1.5vw)] leading-tight">
        Contact Us
      </h1>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          {currentMessages.map((message, index) => (
            <div
              className="flex items-center mb-2.5 p-2.5 rounded-[5px] bg-light-ev1 dark:bg-dark-ev1"
              key={index}
            >
              <FaDotCircle className="text-malon-color text-[8px] mr-2.5" />
              <div className="flex-1">Email: {message.email}</div>
              <div className="flex items-center gap-3">
                {!message.assignTo && (
                  <div className="w-3 h-3 flex items-center justify-center text-white text-[10px] cursor-default rounded-[50%] bg-orange-color" />
                )}
                <FaEye
                  className="text-base text-orange-color"
                  onClick={() => handleViewDetails(message)}
                />
              </div>
            </div>
          ))}
          <div className="justify-center mt-2.5 flex">
            <button
              className="text-white-color rounded mx-[5px] my-0 px-4 py-2 border-none disabled:bg-[gray] bg-orange-color disabled:hover:bg-[gray] hover:bg-malon-color"
              onClick={handlePrevPage}
              disabled={!canGoPrev}
            >
              Prev
            </button>
            <button
              className="text-white-color rounded mx-[5px] my-0 px-4 py-2 border-none disabled:bg-[gray] bg-orange-color disabled:hover:bg-[gray] hover:bg-malon-color"
              onClick={handleNextPage}
              disabled={!canGoNext}
            >
              Next
            </button>
          </div>
          {selectedMessage && (
            <Modal onClose={() => setShowModel(false)} isOpen={showModel}>
              <ContactMessageDetail
                message={selectedMessage}
                handleClick={handleClick}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  )
}

export default Contact
