import { ButtonHTMLAttributes } from "react"

type Props = {
  text: string
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  className?: string
  disabled?: boolean
}

const Button = ({ text, onClick, type, className, disabled }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer font-medium text-white capitalize text-[13px] px-[25px] py-[5px] rounded-[5px] bg-orange-color border-none hover:bg-malon-color ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
