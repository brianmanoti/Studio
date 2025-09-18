import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/main-layout";
import Home from "./Pages/Home";
import ProjectLayout from "./Layouts/projects-layout";
import PurchaseOrders from "./Pages/Purchase-orders";
import ProjectForm from "./components/Projects/projects-Form";

function App() {


  return (
  <BrowserRouter>
    <Routes>
      {/* Public Pages with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/new" element={<ProjectForm />} />
      </Route>

        {/* Dashboard Pages with Dashboard Layout */}
        <Route path="/projects" element={<ProjectLayout />}>
          <Route index element={<PurchaseOrders />} />

        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
