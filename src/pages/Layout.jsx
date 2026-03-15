import { Outlet } from "react-router-dom";
import Topbar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
export default function Layout({
  setSelectedCategory,
  searchTerm,
  setSearchTerm
}) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
       <Sidebar />
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <Topbar
          onCatClick={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Page Content */}
        <div className="flex flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
}