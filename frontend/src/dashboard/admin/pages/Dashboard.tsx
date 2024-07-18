import { Link, Outlet } from "react-router-dom";
import logo from "../../../assets/logo.svg";

export default function Dashboard() {
  return (
    <div className="w-[80%]  mx-auto flex items-start text-white">
      <div className="bg-black  w-[15rem] h-[100vh] text-center">
        <div>
          <img className="mx-auto my-8" src={logo} alt="" srcset="" />
        </div>
        <h1 className="my-12 text-3xl font-semibold">Dashboard</h1>

        <ul classname="flex flex-col font-medium  ">
          <li className="my-3 ">
            <Link
              to={"/dashboard/admin"}
              className="underline focus:text-[#CAC326] "
            >
              manage vehicles
            </Link>
          </li>
          <li className="my-3 ">
            <Link
              to={"/dashboard/admin/users"}
              className="underline focus:text-[#CAC326]"
            >
              manage user
            </Link>
          </li>
          <li className="my-3 ">
            <Link
              to={"/dashboard/admin/locations"}
              className="underline focus:text-[#CAC326]"
            >
              manage location
            </Link>
          </li>
          <li className="my-3 ">
            <Link
              to={"/dashboard/admin/fleets"}
              className="underline focus:text-[#CAC326]"
            >
              manage fleet
            </Link>
          </li>
          <li className="my-3 ">
            <Link
              to={"/dashboard/admin/reports"}
              className="underline focus:text-[#CAC326]"
            >
              manage reports
            </Link>
          </li>
        </ul>
      </div>
      <div className=" p-12 w-[100%] opacity-90 h-[100vh]">
        <div className="flex bg-black p-6 rounded-[1.5rem] justify-between items-center">
          <h2>Admin</h2>
          <div className="flex items-center gap-4">
            <p>username</p>
            <div className="h-8 w-8 rounded-full bg-slate-200"></div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
