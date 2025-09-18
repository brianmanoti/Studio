
import { Outlet } from "react-router-dom";
import BaseLayout from "./base-layout";

const ProjectLayout = () => {
  return (
 <BaseLayout>
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 min-h-[calc(100vh-120px)]">
        <nav>
          <ul className="space-y-3">
            <li><a href="/dashboard" className="hover:text-blue-400">Dashboard</a></li>
            <li><a href="/dashboard/purchase-orders" className="hover:text-blue-400">Purchase Orders</a></li>
          </ul>
        </nav>
      </aside>

      {/* Project Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  </BaseLayout>
  );
};

export default ProjectLayout;
