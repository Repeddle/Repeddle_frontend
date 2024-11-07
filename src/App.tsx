import { Outlet, UNSAFE_useScrollRestoration } from "react-router-dom";
import "./App.css";
import useTheme from "./hooks/useTheme";
import ToastNotification from "./components/ui/ToastNotification";
import ArticleProvider from "./context/ArticleContext";

function App() {
  const { isDarkMode } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UNSAFE_useScrollRestoration();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="dark:bg-black-color font-medium dark:text-white-color text-sm md:text-base transition-colors duration-300 ease-in-out">
        <ToastNotification />
        <ArticleProvider>
          {" "}
          {/* Wrap the Outlet with ArticleProvider */}
          <Outlet />
        </ArticleProvider>
      </div>
    </div>
  );
}

export default App;
