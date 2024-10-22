import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPassMutation } from "../features/api/vehiclesApi";
import { BallTriangle } from "react-loader-spinner";
interface FormData {
  email: string;
}
export default function Reset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [resetPass, { data: response, isError, isSuccess, isLoading, error }] =
    useResetPassMutation();
  async function handleReset(data: FormData) {
    try {
      const result = await resetPass(data).unwrap();
      console.log({ result });
    } catch (error) {
      console.log(error);
    }
  }

  if (isSuccess) {
    toast.success(response.message);
  }
  if (isError) {
    toast.error((error as any).data.error);
  }

  return (
    <div className="w-[28rem] m-auto bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7 ">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">
            Forgot password?
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Remember your password?
            <Link
              to={"/login/user"}
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit(handleReset)} noValidate>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message:
                          "Please include a valid email address so we can get back to you",
                      },
                    })}
                    type="email"
                    id="email"
                    name="email"
                    className="py-3 px-4 block w-full shadow-md border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="email-error"
                  />
                  {errors.email?.message && (
                    <div className=" absolute mt-3 inset-y-0 end-0 pointer-events-none pe-3">
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
                {errors.email?.message !== undefined && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors.email.message}
                  </p>
                )}
              </div>

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
