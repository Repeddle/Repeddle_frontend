import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Auth() {
  const { loading, user } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
