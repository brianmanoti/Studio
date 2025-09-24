import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/main-layout";
import Home from "./Pages/Home";
import ProjectLayout from "./Layouts/projects-layout";
import ProjectForm from "./components/Projects/projects-Form";
import FinancialDashboard from "./Pages/Dashboard";
import PurchaseOrdersTable from "./Pages/tables/Purchase-orders";
import WagesTable from "./Pages/tables/Wages-table";
import ExpenseTable from "./Pages/tables/expense-table";

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
          <Route index element={<FinancialDashboard />} />
          <Route path="purchase-orders" element={<PurchaseOrdersTable />} />
          <Route path="wages" element={<WagesTable />} />
          <Route path="expenses" element={<ExpenseTable />} />

        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
