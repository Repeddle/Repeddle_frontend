import useTheme from "../../../hooks/useTheme"

const LoadingControlModal = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="absolute backdrop-blur-sm inset-0 flex items-center justify-center z-50">
      <img
        className="w-[15%] md:w-[10%] lg:w-[7%] min-w-16 rounded-[0.2rem]"
        src={
          isDarkMode
            ? "/images/logo/white_anime_logo.gif"
            : "/images/logo/black_anime_logo.gif"
        }
        alt="loading"
      />
    </div>
  )
}

export default LoadingControlModal
