import { Link } from "react-router-dom";
import { useForm, FieldError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userLogin } from "../features/login/userLoginSlice";
import { adminLogin } from "../features/login/adminLoginSlice";
import { RootState, AppDispatch } from "../app/store";
import { toast } from 'react-toastify';
interface LoginProps {
  title: string;
}
interface LoginFormData {
  email: string;
  password: string;
}

export default function Login({ title }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const response = useSelector((state: RootState) => state.loginUser);
  const adminRes = useSelector((state: RootState) => state.loginAdmin);
  const navigate = useNavigate();

  async function handleLogin(data: LoginFormData): Promise<any> {
    
    if (title === "User") {
      const logins = { ...data, role: "user" };
      dispatch(userLogin(logins));

      if (typeof response.error !== "string") {
        setMessage(errors.email?.message);
      }
    } else {
      const logins = { ...data, role: "admin" };
      dispatch(adminLogin(logins));
      if (typeof response.error !== "string") {
        setMessage(errors.password?.message);
      }
    }
  }

  useEffect(() => {
    if (title === "User") {
      if (response.user !== null) {
        toast.success("login successfull")
        navigate("/dashboard/user");
      }
    } else {
      if (adminRes.user !== null) {
        toast.success("login successfull")
        navigate("/dashboard/admin");
      }
    }
  }, [navigate, title, adminRes.user, response.user]);

  return (
    <div id="login" className="h-[100vh] flex justify-center items-center">
      <div className="">
        <h1 className="text-center text-white text-3xl font-bold mb-4">
          {title}
        </h1>

        {message !== null && (
          <p className="text-center font-semibold text-xl text-[#d9534f] ">
            {message}
          </p>
        )}
        <form
          onSubmit={handleSubmit(handleLogin)}
          action=""
          className="mb-16 m-auto flex flex-col max-w-[30rem]"
        >
          <input
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "enter a valid email address",
              },
            })}
            className="form-input"
            type="email"
            placeholder="email"
          />
          {errors.email !== undefined && (
            <p className="text-[#d9534f]">
              {(errors.email as FieldError)?.message ||
                "Status error message not available"}
            </p>
          )}
          <input
            {...register("password", { required: "enter password" })}
            className="form-input"
            type="password"
            placeholder="password"
          />
          {errors.password !== undefined && (
            <p className="text-[#d9534f]">
              {(errors.password as FieldError)?.message ||
                "Status error message not available"}
            </p>
          )}
          <button className="bg-black opacity-70 p-3 rounded-lg text-white text-lg font-semibold">
            Login
          </button>
        </form>

        {title === "User" && (
          <Link
            to={"/register"}
            className="text-white text-center block hover:text-[#CAC326] underline"
          >
            register here
          </Link>
        )}

        {title === "User" && (
          <Link
            to={"/login/admin"}
            className="text-white mt-4 text-center block hover:text-[#CAC326] underline"
          >
            admin
          </Link>
        )}
        {title === "Admin" && (
          <Link
            to={"/login/user"}
            className="text-white mt-4 text-center block hover:text-[#CAC326] underline"
          >
            user
          </Link>
        )}
      </div>
    </div>
  );
}
