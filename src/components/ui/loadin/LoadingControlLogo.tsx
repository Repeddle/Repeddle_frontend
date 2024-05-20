import useTheme from "../../../hooks/useTheme"

const LoadingControlModal = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <img
        className="w-[15%] md:w-[10%] lg:w-[7%] min-w-16 rounded-[0.2rem]"
        src={
          isDarkMode
            ? "https://res.cloudinary.com/emirace/image/upload/v1666000558/Icon_White_xpdmum.gif"
            : "https://res.cloudinary.com/emirace/image/upload/v1666000541/Icon_Black_g8wcdj.gif"
        }
        alt="loading"
      />
    </div>
  )
}

export default LoadingControlModal
