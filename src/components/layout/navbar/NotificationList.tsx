import moment from "moment"
import { Link } from "react-router-dom"
import { Notification } from "../../../types/conversation"

type Props = {
  notifications: Notification[]
}

const NotificationList = ({ notifications }: Props) => {
  return (
    <div
      className={`w-[270px] max-h-[70vh] overflow-auto absolute z-[9] -translate-x-2/4 p-2.5 rounded-[0.2rem] left-2/4 top-[50px] dark:bg-black 
                dark:shadow-[0_5px_16px_rgba(225,225,225,0.2)] bg-white shadow-[0_5px_16px_rgba(0,0,0,0.2)]`}
    >
      <div className="font-bold mb-2.5 dark:text-white text-black">
        Notifications
      </div>
      {notifications.length === 0 ? (
        <b className="text-center text-black dark:text-white text-sm md:text-base font-semibold">
          No Notification
        </b>
      ) : (
        notifications.map((not) => (
          <Link to={not.link}>
            <div
              className="flex items-center relative mb-[5px] p-[3px] dark:hover:bg-dark-ev1 hover:bg-light-ev1"
              key={not._id}
              onClick={() => {
                // socket.emit("remove_id_notifications", not._id)
              }}
            >
              <img
                className="w-[50px] h-[50px] rounded-[50%]"
                src={not.user.image}
                alt="img"
              />
              <div className="text-sm flex-1 ml-[5px]">
                <p className="dark:text-white text-black">{not.message}</p>
                <p className="text-orange-color">
                  {moment(not.createdAt).fromNow()}
                </p>
              </div>
              {!not.read && (
                <div className="bg-orange-color -translate-y-1/2 w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-1/2" />
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default NotificationList
