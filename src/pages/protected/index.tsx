import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Protected() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }

  return (
    <main className="">
      <Outlet />
    </main>
  );
}

export default Protected;
