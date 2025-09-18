import { Outlet } from "react-router-dom";
import BaseLayout from "./base-layout";

const MainLayout = () => (
  <BaseLayout>
    <div className="p-6">
      <Outlet />
    </div>
  </BaseLayout>
);


export default MainLayout;
