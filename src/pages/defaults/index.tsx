import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import StickyNav from "../../components/layout/StickyNav"
import Support from "../../components/Support"

function Default() {
  const location = useLocation()

  const notAllowedRoutes = ["/messages", "/categories"]
  const notAllowedRoutesNav = ["/messages"]
  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Support />
      {!notAllowedRoutes.includes(location.pathname) && <Footer />}
      {!notAllowedRoutesNav.includes(location.pathname) && <StickyNav />}
    </main>
  )
}

export default Default
