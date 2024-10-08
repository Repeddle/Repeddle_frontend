import { Navigate, Outlet } from "react-router-dom"
import { useState } from "react"
import Sidebar from "../../../components/layout/Sidebar"
import StickyNav from "../../../components/layout/StickyNav"
import Middlebar from "../../../components/layout/navbar/Middlebar"
import LoadingLogoModal from "../../../components/ui/loadin/LoadingLogoModal"
import useAuth from "../../../hooks/useAuth"

function Dashboard() {
  const { user, loading } = useAuth()
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return <LoadingLogoModal />
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />
  }

  return (
    <main className="">
      <div className="p-4 bg-light-ev1 dark:bg-dark-ev1">
        <Middlebar />
      </div>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden  ">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div
          className={`flex-1 py-4 px-2 sm:p-4 ${
            isSidebarOpen ? "ml-64" : "ml-0 md:ml-64 overflow-x-hidden"
          }`}
        >
          {/* Mobile menu button */}
          {/* <div className="md:hidden">
            <button onClick={toggleSidebar} className="">
              <RiMenu2Fill className="text-primary text-3xl" />
            </button>
          </div> */}

          {/* Content */}
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
      <StickyNav />
    </main>
  )
}

export default Dashboard
