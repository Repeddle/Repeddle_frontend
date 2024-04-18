import { MouseEvent, PropsWithChildren, useRef } from "react"
import { FaTimes } from "react-icons/fa"

type Props = PropsWithChildren<{
  showModel: boolean
  setShowModel: (val: boolean) => void
  height?: string
  width?: string
}>

const SmallModel = ({
  children,
  showModel,
  setShowModel,
  height,
  width,
}: Props) => {
  const modelRef = useRef(null)

  const closeModel = (e: MouseEvent) => {
    if (modelRef.current === e.target) {
      setShowModel(false)
    }
  }

  return (
    <>
      {showModel && (
        <div
          className="w-full h-full fixed flex justify-center items-center z-10 left-0 top-0"
          ref={modelRef}
          onClick={closeModel}
        >
          <div
            className={`relative z-10 rounded-[10px] h-[${height}] w-[${width}] shadow-[0_5px_16px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_16px_rgba(225,225,225,0.2)]`}
          >
            {children}
            <div
              className="cursor-pointer absolute w-8 h-8 z-10 p-0 right-[15px] top-[15px]"
              ariel-label="Close model"
              onClick={() => setShowModel(!showModel)}
            >
              <FaTimes />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SmallModel
