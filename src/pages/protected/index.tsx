import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import StickyNav from "../../components/layout/StickyNav"
import { RiMenu2Fill } from "react-icons/ri"
import { useState } from "react"
import Sidebar from "../../components/layout/Sidebar"
import Middlebar from "../../components/layout/navbar/Middlebar"
import LoadingPage from "../../components/ui/LoadingPage"

function Protected() {
  const { user, loading } = useAuth()
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return <LoadingPage />
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
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
          className={`flex-1 p-4 ${
            isSidebarOpen ? "ml-64" : "ml-0 md:ml-64 overflow-x-hidden"
          }`}
        >
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleSidebar} className="">
              <RiMenu2Fill className="text-primary text-3xl" />
            </button>
          </div>

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

export default Protected
