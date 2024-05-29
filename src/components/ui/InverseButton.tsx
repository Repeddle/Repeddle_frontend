import { ButtonHTMLAttributes } from "react"
import Spinner from "./Spinner"

type Props = {
  text: string
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  className?: string
  disabled?: boolean
  isLoading?: boolean
}

const InverseButton = ({
  text,
  onClick,
  type = "button",
  className,
  disabled,
  isLoading,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer disabled:opacity-80 font-medium text-orange-color hover:text-malon-color capitalize text-[13px] px-[25px] py-2
      rounded-[5px] bg-white border border-orange-color hover:border-malon-color dark:bg-black ${className}`}
    >
      {isLoading && <Spinner />}
      {!isLoading && text}
    </button>
  )
}

export default InverseButton
