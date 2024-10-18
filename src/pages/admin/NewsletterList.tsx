import moment from "moment"
import { useEffect, useState } from "react"
import { FaCheckCircle, FaTrash } from "react-icons/fa"
import { INewsletter } from "../../types/message"
import { emailList as emailListData } from "../../utils/data"
import useNewsletter from "../../hooks/useNewsletter"
import useToastNotification from "../../hooks/useToastNotification"
import LoadingControlModal from "../../components/ui/loadin/LoadingControlLogo"
import LoadingBox from "../../components/LoadingBox"

const NewsletterList = () => {
  const [inputEmail, setInputEmail] = useState("")
  const [emailName, setEmailName] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const [loadingSend] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [loadingRebatch] = useState(false)
  const [loadingNewsletters, setLoadingNewsletters] = useState(false)

  const {
    newsletters,
    fetchNewsletter,
    error,
    createNewsletter,
    deleteNewsletter,
  } = useNewsletter()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    const fetchLetter = async () => {
      setLoadingNewsletters(true)
      await fetchNewsletter()
      setLoadingNewsletters(false)
    }

    fetchLetter()
  }, [])

  useEffect(() => {
    if (error) addNotification(error)
  }, [error])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rebatchs: any[] = []
  const emailLists = [emailListData]

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure to delete")) {
      const data = await deleteNewsletter(id)

      if (data.success) {
        addNotification(data.message ?? "Newsletter deleted Successfully")
      }
    }
  }

  const hasMatchingEmailName = (newsletter: INewsletter) => {
    return (
      emailName && newsletter.sent.some((obj) => obj.emailName === emailName)
    )
  }

  const handleSelectAll = () => {
    const selectedEmailSet = new Set(
      newsletters
        .filter(
          (newsletter) =>
            !newsletter.isDeleted && !hasMatchingEmailName(newsletter)
        )
        .map((newsletter) => newsletter.email)
    )
    setSelectedEmails([...selectedEmailSet])
    setSelectAll(true)
  }

  const handleEmailSelection = (newsletter: INewsletter) => {
    if (newsletter.isDeleted) {
      return
    }
    if (selectedEmails.includes(newsletter.email)) {
      setSelectedEmails(selectedEmails.filter((e) => e !== newsletter.email))
    } else {
      setSelectedEmails([...selectedEmails, newsletter.email])
    }
  }

  const sendEmails = async () => {}

  const handleAddEmail = async () => {
    setLoadingAdd(true)
    const data = await createNewsletter(inputEmail)
    if (data) addNotification("Emails added successfully")

    setLoadingAdd(false)
  }

  return (
    <div className="flex-[4] mb-5 px-5 py-0 min-h-[85vh] bg-light-ev1 dark:bg-dark-ev1">
      <div className="max-w-[600px]">
        <h2 className="text-2xl mb-5">Newsletter Emails</h2>
        <div className="block lg:flex items-center justify-between px-0 py-2.5">
          <li className="flex items-center text-base px-0 py-2.5">
            <input
              className={`mr-2.5 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block
              after:visible after:relative after:border after:border-orange-color after:-left-px after:-top-0.5
              checked:after:w-[15px] checked:after:h-[15px] checked:after:content-[""] checked:after:inline-block
              checked:after:visible checked:after:relative checked:after:bg-orange-color checked:after:border
              checked:after:border-orange-color checked:after:-left-px checked:after:-top-0.5 after:bg-white-color after:dark:bg-black-color`}
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label htmlFor="select-all">Select All</label>
            <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
              <select
                value={emailName}
                onChange={(e) => setEmailName(e.target.value)}
                className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
              >
                <option value="">-- select --</option>

                {emailLists.map((emailList) => (
                  <option key={emailList.name} value={emailList.name}>
                    {emailList.name}
                  </option>
                ))}
              </select>
            </div>
          </li>
          {loadingSend ? (
            <LoadingControlModal />
          ) : (
            <button
              className="text-white-color cursor-pointer ml-auto px-2.5 py-[7px] rounded-[0.2rem] border-none bg-orange-color hover:bg-malon-color"
              onClick={sendEmails}
            >
              Send Email
            </button>
          )}
        </div>
        <input
          className="h-10 mr-2.5 mb-2.5 p-2.5 bg-transparent rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border text-black-color dark:text-white-color border-light-ev4 dark:border-dark-ev4"
          value={inputEmail}
          type="text"
          onChange={(e) => setInputEmail(e.target.value.trim())}
        />
        {loadingAdd ? (
          <LoadingBox />
        ) : (
          <button
            className="text-white-color cursor-pointer ml-auto px-2.5 py-[7px] rounded-[0.2rem] border-none bg-orange-color hover:bg-malon-color"
            onClick={handleAddEmail}
          >
            Add Email
          </button>
        )}

        <ul>
          {loadingNewsletters && <LoadingControlModal />}
          {!loadingNewsletters &&
            newsletters.map((newsletter, index) => (
              <li
                className="block lg:flex items-center justify-between text-base px-0 py-2.5 border-b-[#ccc] border-b"
                key={newsletter._id}
              >
                <div className="flex items-center text-base px-0 py-2.5">
                  <input
                    className={`mr-2.5 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block
                  after:visible after:relative after:border after:border-orange-color after:-left-px after:-top-0.5
                  checked:after:w-[15px] checked:after:h-[15px] checked:after:content-[""] checked:after:inline-block
                  checked:after:visible checked:after:relative checked:after:bg-orange-color checked:after:border
                  checked:after:border-orange-color checked:after:-left-px checked:after:-top-0.5 after:bg-white-color after:dark:bg-black-color`}
                    type="checkbox"
                    checked={selectedEmails.includes(newsletter.email)}
                    onChange={() => handleEmailSelection(newsletter)}
                  />
                  <div className="mr-[5px]">{index + 1}. </div>
                  <div
                    className={`flex-1 overflow-hidden text-nowrap text-ellipsis ${
                      newsletter.isDeleted ? "text-[gray] line-through" : ""
                    }`}
                  >
                    {newsletter.email}
                  </div>
                  {emailName &&
                    newsletter?.sent.some(
                      (obj) => obj.emailName === emailName
                    ) && (
                      <FaCheckCircle className="text-green-color bg-white rounded-full ml-2.5" />
                    )}
                </div>
                <div className="text-[#999]">
                  {moment(newsletter.createdAt).format("LLL")}
                </div>
                <FaTrash
                  className="cursor-pointer ml-2.5 text-[red]"
                  onClick={() => deleteHandler(newsletter._id)}
                />
              </li>
            ))}
        </ul>
        <div className="h-[100px]" />
        <h2 className="text-xl mb-5">Rebatch emails</h2>

        <ul>
          {loadingRebatch && <LoadingBox />}
          {rebatchs.map((rebatch) => (
            <li
              className="flex items-center justify-between text-base px-0 py-2.5 border-b-[#ccc] border-b"
              key={rebatch._id}
            >
              <div className="flex items-center text-base px-0 py-2.5">
                <input
                  className={`mr-2.5 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block
                  after:visible after:relative after:border after:border-orange-color after:-left-px after:-top-0.5
                  checked:after:w-[15px] checked:after:h-[15px] checked:after:content-[""] checked:after:inline-block
                  checked:after:visible checked:after:relative checked:after:bg-orange-color checked:after:border
                  checked:after:border-orange-color checked:after:-left-px checked:after:-top-0.5 after:bg-white-color after:dark:bg-black-color`}
                  type="checkbox"
                  checked={selectedEmails.includes(rebatch.email)}
                  onChange={() => handleEmailSelection(rebatch.email)}
                />
                <div className="flex-1">{rebatch.email}</div>
              </div>
              <div>{moment(rebatch.createdAt).format("LLL")}</div>
              <FaTrash
                onClick={() => deleteHandler(rebatch._id)}
                className="text-[red] cursor-pointer ml-2.5"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewsletterList
