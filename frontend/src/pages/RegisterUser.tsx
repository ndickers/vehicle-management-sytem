import { Link } from "react-router-dom";
import { useForm, FieldError } from "react-hook-form";
import { useState } from "react";
import { useRegisterUserMutation } from "../features/api/vehiclesApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const [registerUser, { isError, isLoading, error }] = useRegisterUserMutation(
    {}
  );

  async function handleRegisterUser({ confirmPass, username, ...userDetails }) {
    const pass = userDetails.password;
    if (pass === confirmPass) {
      setShowMessage(false);
      try {
        const result = await registerUser({
          ...userDetails,
          fullname: username,
          role: "user",
        }).unwrap();
        console.log(result);
        if (result.message === "user created") {
          toast.success("user created successfull");
          navigate("/login/user");
        }
      } catch (error) {
        toast.error("user created failed");
        console.log(error);
      }
    } else {
      setShowMessage(true);
    }
  }
  if (isLoading) {
    return (
      <div className="bg-black">
        <h1 className="text-white">creating user....</h1>
      </div>
    );
  }
  if (isError) {
    console.log(error);
    return (
      <div className="bg-black">
        <h1 className="text-white">Servere error. unable to register</h1>
      </div>
    );
  }

  return (
    <div className="h-[100vh]" id="register">
      <div>
        <h1 className="text-center text-white text-3xl font-bold mb-4">
          Register
        </h1>
        {showMessage && (
          <p className="text-base text-center text-[#d9534f] font-bold">
            password do no match
          </p>
        )}
        <form
          action=""
          onSubmit={handleSubmit(handleRegisterUser)}
          className=" mb-8 m-auto flex flex-col max-w-[25rem]"
        >
          <input
            {...register("username", { required: "username is required" })}
            className="form-input"
            type="text"
            placeholder="username"
          />
          {errors.username !== undefined && (
            <p className="text-[#d9534f]">
              {(errors.username as FieldError)?.message ||
                "Status error message not available"}
            </p>
          )}

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
            {...register("phone", { required: "phone is required" })}
            className="form-input"
            type="text"
            placeholder="phone"
          />
          {errors.phone !== undefined && (
            <p className="text-[#d9534f]">
              {(errors.phone as FieldError)?.message ||
                "Status error message not available"}
            </p>
          )}
          <input
            {...register("address", { required: "address is required" })}
            className="form-input"
            type="text"
            placeholder="address"
          />
          {errors.address !== undefined && (
            <p className="text-[#d9534f]">
              {(errors.address as FieldError)?.message ||
                "Status error message not available"}
            </p>
          )}
          <input
            {...register("password", { required: "password is required" })}
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
          <input
            {...register("confirmPass", {
              required: "confirm password is required",
            })}
            className="form-input"
            type="password"
            placeholder="confirm password"
          />
          {errors.confirmPass !== undefined && (
            <p className="text-[#d9534f]">
              {(errors.confirmPass as FieldError)?.message ||
                "Status error message not available"}
            </p>
          )}

          <button className="bg-black opacity-70 p-3 mt-3 rounded-lg text-white text-lg font-semibold">
            Register
          </button>
        </form>
        <Link
          to={"/login/user"}
          className="text-white text-center hover:text-[#CAC326] block underline"
        >
          login here
        </Link>
      </div>
    </div>
  );
}
