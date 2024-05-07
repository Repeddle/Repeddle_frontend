type Props = {
  color?: string
  size?: "sm" | "md" | "lg"
}

const LoadingBox = ({ size = "md", color }: Props) => {
  const sizeClass =
    size === "sm" ? "h-6 w-6" : size === "lg" ? "h-18 w-18" : "h-10 w-10"

  const colorClass = color
    ? `border-${color}`
    : "dark:border-light-ev1 border-dark-ev1"

  return (
    <div
      className={`animate-spin rounded-full border-t-2   ${sizeClass} ${colorClass}`}
    />
  )
}

export default LoadingBox
