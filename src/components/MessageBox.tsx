import { PropsWithChildren } from "react"

type Props = PropsWithChildren & {
  className?: string
}

const MessageBox = ({ children, className }: Props) => {
  return (
    <div
      className={`w-full flex justify-center pt-5 ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  )
}

export default MessageBox
