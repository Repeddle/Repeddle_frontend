
import Search from "./pages/defaults/Search";
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Default from './pages/defaults';
import Home from './pages/defaults/Home';
import Protected from './pages/protected';
import Cart from './pages/defaults/Cart';
import Login from './pages/auth/login';
import Auth from './pages/auth';
import Register from './pages/auth/register';
import Dashboard from './pages/protected/dashboard';
import About from './pages/defaults/info/About';
import Returns from './pages/defaults/info/Returns';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth/",
        element: <Auth />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        path: "/",
        element: <Default />,
        children: [
          { path: "", element: <Home /> },
          { path: "search", element: <Search /> },
          { path: "cart", element: <Cart />},
          { path: 'about', element: <About /> },
          { path: 'returns', element: <Returns /> },
        ],
      },
      {
        path: "/",
        element: <Protected />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
])

export default router
