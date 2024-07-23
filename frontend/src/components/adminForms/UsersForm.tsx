import { useForm, FieldError } from "react-hook-form";
import {
  useRegisterUserMutation,
  useUpdateUserMutation,
} from "../../features/api/vehiclesApi";
import { useEffect } from "react";

export default function UsersForm({ setShowUserForm, userDetail, update }) {
  const [registerUser, { isError, error, isLoading }] =
    useRegisterUserMutation();
  const [
    updateUser,
    { isError: updateIsError, error: updateError, isLoading: updateIsLoading },
  ] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (userDetail === null) {
      reset();
    } else {
      reset({
        email: userDetail.email,
        fullname: userDetail.fullname,
        role: userDetail.role,
        address: userDetail.address,
        phone: userDetail.phone,
      });
    }
  }, [reset, update, userDetail]);

  async function handleCreateUser(data) {
    if (userDetail === null) {
      const userDetails = { ...data, password: "1234" };
      try {
        const result = await registerUser(userDetails);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (update) {
        try {
          const result = await updateUser({ user: data, id: userDetail.id });
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  if (isLoading) {
    return <h1>creating user...</h1>;
  }
  if (isError) {
    console.log(error);

    return <h1>Error, unable to create user</h1>;
  }
  if (updateIsLoading) {
    return <h1>updating user</h1>;
  }
  if (updateIsError) {
    console.log(updateError);
    return <h1>Server error, unable to update user</h1>;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowUserForm((prevData) => ({ ...prevData, show: false }));
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute p-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {update ? "update user" : "Add users"}
      </h1>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("fullname", { required: "username is required" })}
          className="update-form "
          type="text"
          placeholder="username"
        />
        {errors.username !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.username as FieldError)?.message ||
              "username error message not available"}
          </p>
        )}
        <input
          {...register("email", { required: "email is required" })}
          className="update-form bg-white"
          type="email"
          placeholder="email"
        />
        {errors.email !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.email as FieldError)?.message ||
              "email error message not available"}
          </p>
        )}
        <input
          {...register("phone", { required: "phone is required" })}
          className="update-form "
          type="number"
          placeholder="phone"
        />
        {errors.phone !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.phone as FieldError)?.message ||
              "phone error message not available"}
          </p>
        )}
        <input
          {...register("address", { required: "address is required" })}
          className="update-form"
          type="text"
          placeholder="address"
        />
        {errors.address !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.address as FieldError)?.message ||
              "address error message not available"}
          </p>
        )}
        <select
          {...register("role", { required: "role is required" })}
          className="update-form text-black"
          name="role"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        {errors.role !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.role as FieldError)?.message ||
              "role error message not available"}
          </p>
        )}
        <button className="submit-btn ">
          {update ? "update user" : "create user"}
        </button>
      </form>
    </div>
  );
}
