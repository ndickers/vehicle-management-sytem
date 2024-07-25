import DashHeader from "./DashHeader";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateReportMutation } from "../../../features/api/vehiclesApi";
import { RootState } from '../../../app/store';
import { BallTriangle } from "react-loader-spinner";


export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createReport, { error, isLoading, isError }] =
    useCreateReportMutation();
  const userId = useSelector((state:RootState) => state.loginUser.user.id);

  async function handleSubmitReport(data:any) {
    const reportData = {
      userId,
      ...data,
    };
    try {
      const result = await createReport(reportData).unwrap();
      console.log(result);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  if (isLoading) {
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
  }
  if (isError) {
    console.log(error);
    return <h1>Unable to send report</h1>;
  }
  return (
    <div className="px-16 pt-12 w-full">
      <DashHeader title="contact support" />
      <div className="w-[100%] my-3">
        <h1 className="text-center text-2xl font-bold mb-6">report issue</h1>
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
          {errors.subject !== undefined && (
            <p className="text-[#d9534f]"> {typeof errors.subject.message === 'string' ? errors.subject.message : 'Error'}</p>
          )}
          <textarea
            {...register("description", {
              required: "description is required",
            })}
            className="update-form h-[8rem] bg-white"
        
            placeholder="description"
          />
          {errors.description !== undefined && (
            <p className="text-[#d9534f]"> {typeof errors.description.message === 'string' ? errors.description.message : 'Error'}</p>
          )}

          {errors.status !== undefined && (
            <p className="text-[#d9534f]"> {typeof errors.status.message === 'string' ? errors.status.message : 'Error'}</p>
          )}
          <button className="submit-btn ">submit report</button>
        </form>
      </div>
    </div>
  );
}
