import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddEmployee from "../pages/Employees/AddEmployee";
import EmployeeProfile from "../pages/Employees/EmployeeProfile";
import Employees from "../pages/Employees/Employees";
import AddInventory from "../pages/Inventory/AddInventory";
import EditInventory from "../pages/Inventory/EditInventory";
import InventoryDetails from "../pages/Inventory/InventoryDetails";
import InventoryList from "../pages/Inventory/InventoryList";
import Notifications from "../pages/Notifications/Notifications";
import CreateOrder from "../pages/Orders/CreateOrder";
import OrderDetails from "../pages/Orders/OrderDetails";
import Orders from "../pages/Orders/Orders";
import BatchDetails from "../pages/Production/BatchDetails";
import CreateBatch from "../pages/Production/CreateBatch";
import Production from "../pages/Production/Production";
import EmployeeReport from "../pages/Reports/EmployeeReport";
import InventoryReport from "../pages/Reports/InventoryReport";
import Reports from "../pages/Reports/Reports";
import SalesReport from "../pages/Reports/SalesReport";
import AddVendor from "../pages/Vendors/AddVendor";
import VendorProfile from "../pages/Vendors/VendorProfile";
import Vendors from "../pages/Vendors/Vendors";
import useAuth from "../hooks/useAuth";

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<Protected><MainLayout /></Protected>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/inventory/add" element={<AddInventory />} />
        <Route path="/inventory/edit/:id" element={<EditInventory />} />
        <Route path="/inventory/:id" element={<InventoryDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/create" element={<CreateOrder />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/add" element={<AddVendor />} />
        <Route path="/vendors/:id" element={<VendorProfile />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/production" element={<Production />} />
        <Route path="/production/create" element={<CreateBatch />} />
        <Route path="/production/:id" element={<BatchDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/inventory" element={<InventoryReport />} />
        <Route path="/reports/sales" element={<SalesReport />} />
        <Route path="/reports/employees" element={<EmployeeReport />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
