import { Link, Outlet } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import userIcon from "../../../assets/user-icon.png";
import { logout } from "../../../features/login/adminLoginSlice";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


export default function Dashboard() {
  const adminInfo = useSelector((state: RootState) => state.loginAdmin);
  const dispatch = useDispatch();
  const [toggleLogout, setToggleLogout] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-[80%]  mx-auto flex items-start text-white">
      <div className="bg-black  w-[15rem] h-[100vh] text-center">
        <div>
          <img className="mx-auto my-8" src={logo} alt="" />
        </div>
        <h1 className="my-12 text-3xl font-semibold">Dashboard</h1>

        <ul className="flex flex-col font-medium  ">
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
            <p>{adminInfo.user.fullname}</p>
            <div className="flex items-center gap-3 ">
              {toggleLogout && (
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login/admin");
                  }}
                  className="border hover:bg-white hover:text-black border-white bg-black px-2 rounded-md"
                >
                  logout
                </button>
              )}
              <button
                onClick={() => {
                  setToggleLogout((prevState) => !prevState);
                }}
                className="h-8 w-8 rounded-full bg-slate-200"
              >
                <img src={userIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
