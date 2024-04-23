import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import StickyNav from '../../components/layout/StickyNav';

function Default() {
  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Footer />
      <StickyNav />
    </main>
  );
}

export default Default;
