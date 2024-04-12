import { PropsWithChildren } from "react"

type Props = PropsWithChildren & {
  onClick?: () => void
  className?: string
}

const OrangeButton = ({ children, className = "", onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-white bg-orange-color hover:bg-malon-color uppercase m-2.5 px-5 py-[5px] rounded-[0.2rem] ${className}`}
    >
      {children}
    </div>
  )
}

export default OrangeButton
