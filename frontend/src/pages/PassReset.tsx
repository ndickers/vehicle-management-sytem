import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";
import { useUpdatePassMutation } from "../features/api/vehiclesApi";

useUpdatePassMutation;
interface FormData {
  password: string;
  confirmPass: string;
}
export default function PassReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const navigate = useNavigate();

  const [passMatch, setPassMatch] = useState<string | undefined>(undefined);
  const [updatePass, { data: response, error, isError, isLoading, isSuccess }] =
    useUpdatePassMutation();
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");
  const password = watch("password");
  const confirmPass = watch("confirmPass");

  async function handleChangePass(data: FormData) {
    if (password !== confirmPass) {
      setPassMatch("Password does not match the password");
    } else {
      setPassMatch(undefined);
      try {
        console.log({ token, password: data.password });

        const result = await updatePass({
          token: token as string,
          password: data.password,
        });

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (isSuccess) {
    toast.success(response.message);
    navigate("/login/user");
  }
  if (isError) {
    toast.error((error as any).data.error);
  }

  return (
    <div className="mt-7 max-w-[28rem] m-auto bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">
            Reset password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            <Link
              to={"/login"}
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-5">
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>
          <form onSubmit={handleSubmit(handleChangePass)}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="password" className="block text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      validate: {
                        hasUpperCase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Password must contain at least one uppercase letter",
                        hasLowerCase: (value) =>
                          /[a-z]/.test(value) ||
                          "Password must contain at least one lowercase letter",
                        hasNumber: (value) =>
                          /[0-9]/.test(value) ||
                          "Password must contain at least one number",
                        hasSpecialChar: (value) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                          "Password must contain at least one special character",
                      },
                    })}
                    type="password"
                    id="password"
                    name="password"
                    className="py-3 px-4 shadow-md block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="password-error"
                  />
                  {errors.password?.message !== undefined && (
                    <div className="absolute mt-3 inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.password?.message !== undefined && (
                  <p className="text-xs text-red-600 mt-2" id="password-error">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPass", {
                      required: "Confirm your password",
                    })}
                    type="password"
                    id="confirm-password"
                    name="confirmPass"
                    className="py-3 px-4 block shadow-md w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="confirm-password-error"
                  />
                  {passMatch !== undefined && (
                    <div className="absolute mt-3 inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {passMatch !== undefined && (
                  <p
                    className="text-xs text-red-600 mt-2"
                    id="confirm-password-error"
                  >
                    {passMatch}
                  </p>
                )}{" "}
              </div>

              <div className="flex items-center"></div>

              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-0 opacity-70 flex items-center justify-center left-0 h-[100vh] w-[100vw] bg-black">
          <BallTriangle
            height={150}
            width={150}
            radius={9}
            color="white"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
