import { MouseEvent, PropsWithChildren, useContext, useRef } from "react"
import ThemeContext from "../context/ThemeContext"
import { FaTimes } from "react-icons/fa"

type Props = PropsWithChildren & {
  showModel: boolean
  setShowModel: (val: boolean) => void
}

const Model = ({ setShowModel, showModel, children }: Props) => {
  const theme = useContext(ThemeContext)

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
          className="w-screen h-screen fixed flex justify-center items-center z-10 left-0 top-0 bg-black/80"
          ref={modelRef}
          onClick={closeModel}
        >
          <div
            className={`w-full h-full lg:w-auto lg:h-screen relative z-10 rounded-[10px] ${
              theme?.isDarkMode
                ? "shadow-[0_5px_16px_rgba(225,225,225,0.2)]"
                : "shadow-[0_5px_16px_rgba(0,0,0,0.2)]"
            }`}
          >
            <>{children}</>
            <div
              className="cursor-pointer absolute w-8 h-8 z-10 p-0 right-5 top-5"
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

export default Model
