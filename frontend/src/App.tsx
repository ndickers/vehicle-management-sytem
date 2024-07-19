import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterUser from "./pages/RegisterUser";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import Dashboard from "./dashboard/user/pages/Dashboard";
import AdminDashboard from "./dashboard/admin/pages/Dashboard";
import ViewVehicles from "./dashboard/user/pages/ViewVehicles";
import BookedVehicle from "./dashboard/user/pages/BookedVehicle";
import Vehicles from "./dashboard/admin/pages/Vehicles";
import Users from "./dashboard/admin/pages/Users";
import Location from "./dashboard/admin/pages/Location";
import Fleets from "./dashboard/admin/pages/Fleets";
import Reports from "./dashboard/admin/pages/Reports";
import Contact from "./dashboard/user/pages/Contact";
import ManageSupport from "./dashboard/user/pages/ManageSupport";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  { path: "/login/admin", element: <AdminLogin /> },
  { path: "/login/user", element: <UserLogin /> },
  { path: "/register", element: <RegisterUser /> },

  {
    path: "/dashboard/admin",
    element: <AdminDashboard />,
    children: [
      { path: "", element: <Vehicles /> },
      { path: "users", element: <Users /> },
      { path: "locations", element: <Location /> },
      { path: "fleets", element: <Fleets /> },
      { path: "reports", element: <Reports /> },
    ],
  },
  {
    path: "/dashboard/user",
    element: <Dashboard />,
    children: [
      { path: "", element: <ViewVehicles /> },
      { path: "booked-vehicles", element: <BookedVehicle /> },
      { path: "contact-support", element: <Contact /> },
      { path: "manage-support", element: <ManageSupport /> },
    ],
  },
]);

function App() {
  return (
    <div className="bg-black root">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;