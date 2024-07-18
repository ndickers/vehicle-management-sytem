import { useForm } from "react-hook-form";

export default function BookingForm({ setShowBookForm }) {
  const { register, handleSubmit } = useForm();
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowBookForm(false);
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute p-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">Add users</h1>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("username", { required: "username is required" })}
          className="update-form "
          type="text"
          placeholder="username"
        />
        <input
          {...register("email", { required: "email is required" })}
          className="update-form bg-white"
          type="email"
          placeholder="email"
        />
        <input
          {...register("phone", { required: "phone is required" })}
          className="update-form "
          type="number"
          placeholder="phone"
        />
        <input
          {...register("address", { required: "address is required" })}
          className="update-form"
          type="text"
          placeholder="address"
        />
        <select
          {...register("role", { required: "role is required" })}
          className="update-form text-black"
          name="role"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button className="submit-btn ">book car</button>
      </form>
    </div>
  );
}
