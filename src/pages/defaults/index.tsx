import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';

function Default() {
  return (
    <main className="">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default Default;
