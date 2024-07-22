import { useForm} from "react-hook-form";
import { useUpdateReportMutation } from "../../features/api/vehiclesApi";

interface CustomerReportFormProps {
  setUpdateForm: (updateData: any) => void;
  reportId: string;
}

interface FormValues {
  subject: string;
  description: string;
}

export default function CustomerReportForm({
  setUpdateForm,
  reportId,
}: CustomerReportFormProps) {
  const [updateReport, { isError, isLoading, error }] =
    useUpdateReportMutation();
  const {
    register,
    handleSubmit,
    
  } = useForm<FormValues>();

  async function handleSubmitReport(data: FormValues) {
    try {
      const result = await updateReport({
        report: data,
        id: reportId,
      }).unwrap();
      console.log(result);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
    console.log(reportId);
  }
  if (isLoading) {
    return <h1>updating...</h1>;
  }
  if (isError) {
    console.log(error);
    return <h1>Error, unable to update report</h1>;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setUpdateForm((prevData: { report: any; show: boolean }) => ({
            ...prevData,
            show: false,
          }));
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">update report</h1>
      <form
        onSubmit={handleSubmit(handleSubmitReport)}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("subject", { required: "subject is require" })}
          className="update-form "
          type="text"
          placeholder="subject"
        />
        {/* {errors.subject !== undefined && (
          <p className="text-[#d9534f]">{errors?.subject.message}</p>
        )} */}
        <textarea
          {...register("description", {
            required: "description is required",
          })}
          className="update-form h-[8rem] bg-white"
          placeholder="description"
        />
        {/* {errors.description !== undefined && (
          <p className="text-[#d9534f]">
            {" "}
            {typeof errors.description.message === "string"
              ? errors?.description?.message
              : null}
          </p>
        )} */}

        {/* {errors?.status?.message !== undefined && (
          <p className="text-[#d9534f]">
            {(errors as FieldErrors<FormValues>)?.status?.message}
          </p>
        )} */}
        <button className="submit-btn ">update report</button>
      </form>
    </div>
  );
}
