import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import StickyNav from "../../components/layout/StickyNav"

function Protected() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading</div>
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />
  }

  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Footer />
      <StickyNav />
    </main>
  )
}

export default Protected
