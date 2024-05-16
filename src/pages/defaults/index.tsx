import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import StickyNav from "../../components/layout/StickyNav";

function Default() {
  const location = useLocation();

  const notAllowedRoutes = ["/messages"];
  return (
    <main className="">
      <Navbar />
      <Outlet />
      {!notAllowedRoutes.includes(location.pathname) && <Footer />}
      {!notAllowedRoutes.includes(location.pathname) && <StickyNav />}
    </main>
  );
}

export default Default;
