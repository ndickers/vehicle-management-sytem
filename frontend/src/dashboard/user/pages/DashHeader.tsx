import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import userIcon from "../../../assets/user-icon.png";
import { useState } from "react";
import { logout } from "../../../features/login/userLoginSlice";
import { useNavigate } from "react-router-dom";

export default function DashHeader({ title }: { title: string }) {
  const userInfo = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleLogout, setToggleLogout] = useState(false);
  return (
    <div className="w-[100%]">
      <div className="flex bg-black p-6 rounded-[1.5rem] justify-between items-center">
        <h2>{title}</h2>
        <div className="flex items-center gap-4">
          <p>{userInfo.user.fullname}</p>
          <div className="flex items-center gap-3 ">
            {toggleLogout && (
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/login/user");
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
    </div>
  );
}
