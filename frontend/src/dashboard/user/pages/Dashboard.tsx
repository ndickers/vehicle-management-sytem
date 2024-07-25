import { Link, Outlet } from "react-router-dom";
import logo from "../../../assets/logo.svg";

export default function Dashboard() {
  return (
    <div className="w-[80%] mx-auto flex items-start text-white">
      <div className="bg-black sticky top-0  w-[15rem] h-[100vh] text-center">
        <div>
          <img className="mx-auto my-8" src={logo} alt="" />
        </div>
        <h1 className="my-12 text-3xl font-semibold">Dashboard</h1>

        <ul className="flex flex-col font-medium  ">
          <li className="my-3 ">
            <Link
              to={"/dashboard/user"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F] "
            >
              view vehicles
            </Link>
          </li>
          <li className="my-3 ">
            <Link
              to={"/dashboard/user/booked-vehicles"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F]"
            >
              booked vehicles
            </Link>
          </li>
          <li className="my-3 ">
            <Link
              to={"/dashboard/user/contact-support"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F]"
            >
              contact support
            </Link>
          </li>
          <li className="my-3 ">
            <Link
              to={"/dashboard/user/manage-support"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F]"
            >
              manage support
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
