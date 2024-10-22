import { useForm } from "react-hook-form";
import { useUpdateReportMutation } from "../../features/api/vehiclesApi";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
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
  const [updateReport, { isError, isLoading, error, isSuccess }] =
    useUpdateReportMutation();
  const { register, handleSubmit } = useForm<FormValues>();

  async function handleSubmitReport(data: FormValues) {
    try {
      const result = await updateReport({
        report: data,
        id: reportId,
      }).unwrap();

      setUpdateForm((prevData: { report: any; show: boolean }) => ({
        ...prevData,
        show: false,
      }));
      console.log(result);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
    console.log(reportId);
  }
  if (isLoading) {
    return (
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
    );
  }

  if (isError) {
    console.log(error);
    toast.error("report update failed");
    setUpdateForm((prevData: { report: any; show: boolean }) => ({
      ...prevData,
      show: false,
    }));
    return <h1>Error, unable to update report</h1>;
  }
  if (isSuccess) {
    toast.success("report updated successfully");
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
