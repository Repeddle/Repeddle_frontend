import { Outlet, UNSAFE_useScrollRestoration } from 'react-router-dom';
import './App.css';
import useTheme from './hooks/useTheme';

function App() {
  const { isDarkMode } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UNSAFE_useScrollRestoration();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="dark:bg-background-dark dark:text-background-light text-sm  transition-colors duration-300 ease-in-out">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
