
import { Outlet } from "react-router-dom";
import BaseLayout from "./base-layout";
import Sidebar from "@/components/sideBar";

const ProjectLayout = () => {
  return (
 <BaseLayout>
    <div className="flex">
      {/* Sidebar */}
      <Sidebar current={"projects"} />

      {/* Project Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  </BaseLayout>
  );
};

export default ProjectLayout;
