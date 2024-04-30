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
              ? "https://res.cloudinary.com/emirace/image/upload/v1666000558/Icon_White_xpdmum.gif"
              : "https://res.cloudinary.com/emirace/image/upload/v1666000541/Icon_Black_g8wcdj.gif"
          }
          alt="loading"
        />
      </div>
    </div>
  )
}

export default LoadingPage
