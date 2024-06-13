import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import StickyNav from "../../components/layout/StickyNav";
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

function Protected() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingLogoModal />;
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }

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

export default Protected;
