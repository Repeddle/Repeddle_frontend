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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/auth/',
        element: <Auth />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: '/',
        element: <Default />,
        children: [
          { path: '', element: <Home /> },
          { path: 'cart', element: <Cart /> },
        ],
      },
      {
        path: '/',
        element: <Protected />,
        children: [{ path: 'dashboard', element: <Dashboard /> }],
      },
    ],
  },
]);

export default router;
