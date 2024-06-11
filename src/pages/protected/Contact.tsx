import { useEffect, useMemo, useState } from "react"
import { FaDotCircle, FaEye } from "react-icons/fa"
import Modal from "../../components/ui/Modal"
import ContactMessageDetail from "../../components/ContactMessageDetail"
import { IContactMessage } from "../../types/message"
import useContact from "../../hooks/useContact"
import useToastNotification from "../../hooks/useToastNotification"
import LoadingControlModal from "../../components/ui/loadin/LoadingControlLogo"

const Contact = () => {
  const { contacts, fetchContacts, error, loading, assignContact } =
    useContact()
  const { addNotification } = useToastNotification()

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [refresh])

  useEffect(() => {
    if (error) {
      addNotification(error)
    }
  }, [error])

  const [showModel, setShowModel] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMessage, setSelectedMessage] =
    useState<IContactMessage | null>(null)

  const messagesPerPage = 20 // You can adjust this number according to your preference.
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage * messagesPerPage < contacts.length

  const currentMessages = useMemo(() => {
    const indexOfLastMessage = currentPage * messagesPerPage
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage

    return contacts.slice(indexOfFirstMessage, indexOfLastMessage)
  }, [currentPage, contacts])

  const handleViewDetails = (message: IContactMessage) => {
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
    const res = await assignContact(id)
    if (res) addNotification(res)
    setRefresh(!refresh)
  }

  return (
    <div className="flex-[4] mb-5 px-5 py-0 relative flex flex-col min-h-[85vh]">
      <h1 className="text-[calc(1.375rem_+_1.5vw)] leading-tight">
        Contact Us
      </h1>
      {loading && <LoadingControlModal />}
      {!loading && (
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
                  className="text-base text-orange-color cursor-pointer"
                  onClick={() => handleViewDetails(message)}
                />
              </div>
            </div>
          ))}

          {contacts.length > 0 && (
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
          )}

          {contacts.length === 0 && <div className="mt-4">No contact yet</div>}

          {selectedMessage && (
            <Modal
              size="lg"
              onClose={() => setShowModel(false)}
              isOpen={showModel}
            >
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
