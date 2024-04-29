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

const Button = ({
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
      className={`cursor-pointer disabled:opacity-80 font-medium text-white capitalize text-[13px] px-[25px] py-2
      rounded-[5px] bg-orange-color border-none hover:bg-malon-color ${className}`}
    >
      {isLoading && <Spinner />}
      {!isLoading && text}
    </button>
  )
}

export default Button
