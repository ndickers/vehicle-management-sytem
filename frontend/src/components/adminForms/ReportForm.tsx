import { useForm } from "react-hook-form";

export default function ReportForm({ setShowReportForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowReportForm(false);
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">update report</h1>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("subject", { required: "subject is require" })}
          className="update-form "
          type="text"
          placeholder="subject"
        />
        {errors.subject !== undefined && (
          <p className="text-[#d9534f]">{errors?.subject.message}</p>
        )}

        <select
          {...register("status", { required: "status is required" })}
          className="update-form text-black"
          name="status"
        >
          <option value="pending">pending</option>
          <option value="resolved">resolved</option>
        </select>
        <input
          {...register("description", { required: "description is required" })}
          className="update-form bg-white"
          type="textarea"
          placeholder="description"
        />
        {errors.description !== undefined && (
          <p className="text-[#d9534f]">{errors.description.message}</p>
        )}

        {errors.status !== undefined && (
          <p className="text-[#d9534f]">{errors.status.message}</p>
        )}
        <button className="submit-btn ">update report</button>
      </form>
    </div>
  );
}
