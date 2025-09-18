
import Header from "../components/Header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const BaseLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
