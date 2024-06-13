import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import Middlebar from "../../components/layout/navbar/Middlebar";
import AdminSidebar from "../../components/layout/AdminSidebar";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  if (!user || user.role !== "Admin") {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="p-4 bg-light-ev1 dark:bg-dark-ev1">
        <Middlebar />
      </div>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-primary bg-opacity-10">
        {/* Sidebar */}
        <AdminSidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

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
    </div>
  );
};

export default AdminLayout;
