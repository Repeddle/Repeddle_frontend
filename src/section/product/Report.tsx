import { useRef, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import MessageItem from "../../components/ui/MessageItem"
import useAuth from "../../hooks/useAuth"
import { FaPlane } from "react-icons/fa"
import Modal from "../../components/ui/Modal"

type Props = {
  reportedUser: string
  productName?: string
}

const Report = ({ productName }: Props) => {
  const [showModel, setShowModel] = useState(false)
  const [reply, setReply] = useState("")

  const scrollRef = useRef(null)

  const loadingReports = false
  const reports: any[] = []

  const { user } = useAuth()

  const handleSubmit = () => {}

  return (
    <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
      <div className="h-full w-full p-5 dark:bg-dark-ev1 bg-light-ev1">
        <div className="h-[calc(100%_-_40px)] w-full mt-5 rounded-[0.2rem] relative dark:bg-dark-ev2 bg-light-ev2">
          <div className="h-[calc(100%_-_66px)] overflow-y-auto pt-10 pb-0 px-10 scrollbar-hide">
            {loadingReports ? (
              <LoadingBox />
            ) : (
              reports.length &&
              reports.map((m, i) => (
                <div ref={scrollRef} key={i}>
                  <MessageItem own={!m.admin} message={m} />
                </div>
              ))
            )}
          </div>
          {user && (
            <div className="absolute flex flex-col items-center -translate-x-2/4 px-5 py-2.5 rounded-[0.2rem] left-2/4 top-[30px] dark:bg-dark-ev3 bg-light-ev3">
              <div className="text-[15px] font-light mb-[5px]">Reporting:</div>
              {productName ? (
                <div>{productName}</div>
              ) : (
                <div className="flex items-center">
                  <img
                    className="w-[60px] h-[60px] object-cover rounded-[50%]"
                    src={user.image}
                    alt="reported User"
                  />
                  <div className="font-bold capitalize ml-2.5">
                    {user.firstName + " " + user.lastName}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center h-[60px] mx-5 my-[3px]">
            <input
              className={`h-full w-full p-5 rounded-[0.2rem] dark:bg-black-color bg-white-color border dark:border-dark-ev3 border-light-ev3
              text-white-color dark:text-black-color focus-visible:outline focus-visible:outline-orange-color placeholder:p-5 placeholder:text-white-color
              placeholder:dark:text-black-color`}
              placeholder="Write a Report/Complain"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <FaPlane
              className="text-3xl cursor-pointer ml-5"
              onClick={handleSubmit}
            />
          </div>
          <div className="text-center text-sm">
            Please leave all information that will help us resolve your query.
            Please include an order number if your report is related to an order
            you purchased from this seller, or you can go to your purchase
            history and report the related item directly from the report tab on
            the item page.
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Report
