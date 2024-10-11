import React, { useEffect } from "react"
import useToastNotification from "../../hooks/useToastNotification"
import { AiFillBell, AiOutlineClose } from "react-icons/ai"

const ToastNotification: React.FC = () => {
  const { notifications, removeNotification } = useToastNotification()

  useEffect(() => {
    const notificationTimeouts: Record<string, number> = {}

    notifications.forEach((notification) => {
      if (!notification.action) {
        const timeoutId = setTimeout(() => {
          removeNotification(notification.id)
        }, 5000) // Adjust the duration as needed
        notificationTimeouts[notification.id] = timeoutId as unknown as number
      }
    })

    return () => {
      // Clear timeouts on unmount
      Object.values(notificationTimeouts).forEach((timeoutId) =>
        clearTimeout(timeoutId)
      )
    }
  }, [notifications, removeNotification])

  const notificationsWithAction = notifications.filter(
    (notification) => notification.action
  )
  const notificationsWithoutAction = notifications.filter(
    (notification) => !notification.action
  )

  return (
    <>
      <div className="fixed top-4 right-4 z-[100]">
        <div className="flex flex-col gap-2">
          {/* Notifications with actions */}
          {notificationsWithAction.map((notification) => (
            <div
              key={notification.id}
              className="bg-orange-color text-white rounded-lg p-4 my-2 shadow-md flex gap-4 items-center justify-between"
            >
              <AiFillBell className="text-lg" />
              <div className="space-y-4">
                <div className="text-xs sm:text-sm md:text-base">
                  {notification.message}
                </div>
                <button
                  onClick={() => {
                    notification.action && notification.action()
                    removeNotification(notification.id)
                  }}
                  className="px-2 py-1 bg-white  text-orange-color text-sm rounded"
                >
                  {notification.buttonText}
                </button>
              </div>

              <AiOutlineClose
                onClick={() => removeNotification(notification.id)}
                className="text-lg cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
        <div className="flex flex-col gap-2">
          {/* Notifications without actions */}
          {notificationsWithoutAction.map((notification) => (
            <div
              key={notification.id}
              className={`${
                notification.error ? "bg-malon-color" : "bg-orange-color"
              } text-white text-xs sm:text-sm md:text-base rounded-lg py-2 px-4 my-2 shadow-md`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ToastNotification
