import { useForm, FieldError } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateReportMutation } from "../../features/api/vehiclesApi";

import { Dispatch, SetStateAction } from "react";
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';

interface ReportFormProps {
  setShowReportForm: Dispatch<SetStateAction<{ report: any; show: boolean }>>;
  report: any;
}
export default function ReportForm({
  setShowReportForm,
  report,
}: ReportFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updateReport, { isError, isLoading, error }] =
    useUpdateReportMutation();
  useEffect(() => {
    if (report !== null) {
      reset({
        userId: report?.user?.id,
        id: report.id,
        subject: report.subject,
        description: report.description,
      });
    }
  }, [report, reset]);

  async function handleUpdateReport(data) {
    console.log(data);

    try {
      const result = await updateReport({
        report: data,
        id: report.id,
      }).unwrap();
      toast.success("report update successfull")
      setShowReportForm({ report: null, show: false });
      reset();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
      </div>)
  }
  if (isError) {
    console.log(error);
    toast.error("report update failed")
    setShowReportForm({ report: null, show: false });
    return <h1>server error, unable to update report</h1>;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowReportForm({ report: null, show: false });
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">update report</h1>
      <form
        onSubmit={handleSubmit(handleUpdateReport)}
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
          <p className="text-[#d9534f]">
            {(errors.subject as FieldError)?.message ||
              "Status error message not available"}
          </p>
        )}

        <select
          {...register("status", { required: "status is required" })}
          className="update-form text-black"
          name="status"
        >
          <option value="pending">pending</option>
          <option value="resolved">resolved</option>
        </select>
        <textarea
          {...register("description", { required: "description is required" })}
          className="update-form h-[8rem] bg-white"
          placeholder="description"
        />
        {errors.description !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.description as FieldError)?.message ||
              "description error message not available"}
          </p>
        )}

        {errors.status !== undefined && (
          <p className="text-[#d9534f]">
            {" "}
            {(errors.status as FieldError)?.message ||
              "Status error message not available"}
          </p>
        )}
        <button className="submit-btn ">update report</button>
      </form>
    </div>
  );
}
