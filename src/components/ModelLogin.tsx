import { MouseEvent, PropsWithChildren, useEffect, useRef } from "react"
import { FaTimes } from "react-icons/fa"

type Props = PropsWithChildren<{
  showModel: boolean
  setShowModel: (val: boolean) => void
}>

const ModelLogin = ({ setShowModel, showModel, children }: Props) => {
  const modelRef = useRef(null)

  const closeModel = (e: MouseEvent) => {
    if (modelRef.current === e.target) {
      setShowModel(false)
    }
  }

  useEffect(() => {
    if (showModel) {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = "15px"
    }
    return () => {
      document.body.style.overflow = "unset"
      document.body.style.paddingRight = "0px"
    }
  }, [showModel])

  return (
    <>
      {showModel && (
        <div
          className="w-full h-full fixed flex justify-center items-center z-[100] left-0 top-0 bg-black/80"
          ref={modelRef}
          onClick={closeModel}
        >
          <div
            className={`w-full lg:w-9/12 h-full lg:h-[600px] overflow-auto relative z-10 rounded-[10px] scrollbar-hide
            shadow-[0_5px_16px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_16px_rgba(225,225,225,0.2)]`}
          >
            {children}
            <div
              className="cursor-pointer absolute text-gray-500 lg:w-8 h-8 z-10 p-0 lg:right-5 top-5 w-5 right-5"
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

export default ModelLogin
