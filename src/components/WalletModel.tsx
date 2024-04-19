import { MouseEvent, PropsWithChildren, useRef } from "react"
import { FaTimes } from "react-icons/fa"

type Props = PropsWithChildren<{
  showModel: boolean
  setShowModel: (val: boolean) => void
}>

const WalletModel = ({ setShowModel, showModel, children }: Props) => {
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
          className="w-full h-full fixed flex justify-center items-center z-10 left-0 top-0 bg-black/80"
          ref={modelRef}
          onClick={closeModel}
        >
          <div className="scrollbar-hide lg:w-[30%] lg:h-auto overflow-auto shadow-[0_5px_16px] shadow-black/20 dark:shadow-white/20 relative z-10 w-full h-full rounded-[10px]">
            {children}
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

export default WalletModel
