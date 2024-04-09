import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"

type Props = {
  color?: string
  size?: "sm" | "md" | "lg"
}

const LoadingBox = ({ size = "md", color }: Props) => {
  const theme = useContext(ThemeContext)
  const sizeClass =
    size === "sm" ? "h-6 w-6" : size === "lg" ? "h-24 w-24" : "h-14 w-14"

  const colorClass = color
    ? `border-${color}`
    : theme?.isDarkMode
    ? "border-light-ev1"
    : "border-dark-ev1"

  return (
    <div
      className={`animate-spin rounded-full border-t-2  border-solid ${sizeClass} ${colorClass}`}
    >
      LoadingBox
    </div>
  )
}

export default LoadingBox
