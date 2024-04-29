import { Outlet, UNSAFE_useScrollRestoration } from "react-router-dom"
import "./App.css"
import useTheme from "./hooks/useTheme"
import ToastNotification from "./components/ui/ToastNotification"

function App() {
  const { isDarkMode } = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UNSAFE_useScrollRestoration()

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="dark:bg-black-color dark:text-white-color text-sm md:text-base transition-colors duration-300 ease-in-out">
        <ToastNotification />
        <Outlet />
      </div>
    </div>
  )
}

export default App
