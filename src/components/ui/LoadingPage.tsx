import useTheme from "../../hooks/useTheme"

const LoadingPage = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="w-screen h-[50vh] flex justify-center items-center z-10">
      <div className="w-full h-full relative z-10 flex justify-center items-center">
        <img
          className="h-[10%] rounded-[0.2rem]"
          src={
            isDarkMode
              ? "/images/logo/white_anime_logo.gif"
              : "/images/logo/black_anime_logo.gif"
          }
          alt="loading"
        />
      </div>
    </div>
  )
}

export default LoadingPage
