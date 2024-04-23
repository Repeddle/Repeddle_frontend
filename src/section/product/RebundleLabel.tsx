import { useCallback, useEffect, useMemo, useState } from "react"
import { FaBoltLightning } from "react-icons/fa6"

type Props = {
  userId: string
}

const RebundleLabel = ({}: Props) => {
  const [show, setShow] = useState(false)
  const [timer, setTimer] = useState("00hrs : 00mins : 00secs")

  //   TODO: get rebundle expire date and show countdown
  const expireDate = useMemo(() => new Date(), [])

  const getTimeRemaining = useCallback((e: string) => {
    const total = Date.parse(e) - Date.parse(new Date().toString())
    if (total <= 0) {
      setShow(false)
    }
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)
    return {
      total,
      hours,
      minutes,
      seconds,
    }
  }, [])

  const update = useCallback(
    (e: string) => {
      const { total, hours, minutes, seconds } = getTimeRemaining(e)
      if (total >= 0) {
        const hoursValue =
          hours === 0 ? "" : (hours > 9 ? hours : "0" + hours) + "hrs : "

        const minutesValue =
          minutes === 0
            ? ""
            : (minutes > 9 ? minutes : "0" + minutes) + "mins : "

        const secondsValue =
          hours === 0 ? "" : (seconds > 9 ? seconds : "0" + seconds) + "secs"

        setTimer(hoursValue + minutesValue + secondsValue)
      }
    },
    [getTimeRemaining]
  )

  useEffect(() => {
    if (show) {
      const timeInterval = setInterval(() => {
        update(expireDate.toString())
      }, 1000)

      return () => {
        clearInterval(timeInterval)
      }
    }
  }, [expireDate, show, update])

  return (
    <>
      {show && (
        <div className="fixed text-xs text-white-color pl-5 p-[5px] rounded-tl-[25px] rounded-bl-[25px] right-0 top-[200px] bg-orange-color">
          <div>
            <FaBoltLightning className="mr-2.5" />
            Rebundle is Active
          </div>
          <span>{timer}</span>
        </div>
      )}
    </>
  )
}

export default RebundleLabel
