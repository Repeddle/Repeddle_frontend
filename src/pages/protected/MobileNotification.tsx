import moment from "moment"
import { useNavigate } from "react-router"

type TempNotifications = {
  link: string
  _id: string
  userImage: string
  createdAt: string
  msg: string
  read: boolean
}

const MobileNotification = () => {
  const navigate = useNavigate()

  const notifications: TempNotifications[] = []

  const handleOnClick = (not: TempNotifications) => {
    // console.log("not", not)
    // socket.emit("remove_id_notifications", not._id)
    navigate(not.link)
  }

  return (
    <div>
      <div className="p-2.5 max-h-screen overflow-y-scroll bg-white dark:bg-black">
        <div className="font-bold mb-2.5 text-black dark:text-white">
          Notifications
        </div>
        {notifications.length < 0 ? (
          <b>No Notification</b>
        ) : (
          notifications.map((not) => (
            <div
              className="flex items-center mb-[5px] relative p-[3px] hover:bg-light-ev1 dark:hover:bg-dark-ev1"
              key={not._id}
              onClick={() => handleOnClick(not)}
            >
              <img
                className="w-[50px] h-[50px] rounded-[50%]"
                src={not.userImage}
                alt="img"
              />
              <div className="flex-1 ml-[5px] text-sm">
                <div className="text-black dark:text-white">{not.msg}</div>
                <div className="text-orange-color">
                  {moment(not.createdAt).fromNow()}
                </div>
              </div>
              {!not.read && (
                <div className="w-3 h-3 bg-orange-color flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-1/2 -translate-y-1/2 top-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MobileNotification
