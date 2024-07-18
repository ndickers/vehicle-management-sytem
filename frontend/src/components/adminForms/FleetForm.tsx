import { useForm } from "react-hook-form";

export default function FleetForm({ setShowFleetForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowFleetForm(false);
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">Add fleet</h1>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("username", { required: "username is require" })}
          className="update-form "
          type="text"
          placeholder="username"
        />
        {errors.username !== undefined && (
          <p className="text-[#d9534f]">{errors?.username.message}</p>
        )}
        <input
          {...register("email", { required: "email is required" })}
          className="update-form bg-white"
          type="email"
          placeholder="email"
        />
        {errors.email !== undefined && (
          <p className="text-[#d9534f]">{errors.email.message}</p>
        )}
        <input
          {...register("phone", {
            required: "phone is required",
          })}
          className="update-form "
          type="number"
          placeholder="phone"
        />
        {errors.phone !== undefined && (
          <p className="text-[#d9534f]">{errors.phone.message}</p>
        )}
        <input
          {...register("address", { required: "address is required" })}
          className="update-form"
          type="text"
          placeholder="address"
        />
        {errors.address !== undefined && (
          <p className="text-[#d9534f]">{errors.address.message}</p>
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
          <p className="text-[#d9534f]">{errors.role.message}</p>
        )}
        <button className="submit-btn ">
          post fleet
        </button>
      </form>
    </div>
  );
}
