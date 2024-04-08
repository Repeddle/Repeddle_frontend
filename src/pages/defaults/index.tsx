import { Outlet } from "react-router-dom"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"

function Default() {
  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Default
