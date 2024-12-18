import MessageImage from "./ui/MessageImage"
import { IContactMessage } from "../types/message"

type Props = {
  message: IContactMessage
  handleClick: (val: string) => void
}

const ContactMessageDetail = ({ message, handleClick }: Props) => {
  const {
    _id,
    name,
    email,
    category,
    subject,
    message: messageContent,
    file,
    assignTo,
  } = message

  console.log(message)

  return (
    <div className="mb-5 p-5">
      <div className="mb-2.5">
        <strong className="font-bold">Name:</strong> <div>{name}</div>
      </div>
      <div className="mb-2.5">
        <strong className="font-bold">Email:</strong>{" "}
        <div className="text-malon-color" onClick={() => handleClick(_id)}>
          <a href={`mailto: ${email}`}>{email}</a>
        </div>
      </div>
      <div className="mb-2.5">
        <strong className="font-bold">Category:</strong> <div>{category}</div>
      </div>
      <div className="mb-2.5">
        <strong className="font-bold">Subject:</strong> <div>{subject}</div>
      </div>
      <div className="mb-2.5">
        <strong className="font-bold">Message:</strong>{" "}
        <div>{messageContent}</div>
      </div>

      <div className="mb-2.5">
        <strong className="font-bold">Asigned to:</strong>{" "}
        <div>{assignTo ? assignTo : "None"}</div>
      </div>
      {file?.length &&
        file.map((it) =>
          it ? (
            <div key={it}>
              <MessageImage url={it} />
            </div>
          ) : null
        )}
    </div>
  )
}

export default ContactMessageDetail
