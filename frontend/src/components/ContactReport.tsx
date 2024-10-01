import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import { useDeleteReportMutation } from "../features/api/vehiclesApi";
import { BallTriangle } from "react-loader-spinner";

export default function ContactReport(props: any) {
  const [deleteReport, { error, isError, isLoading }] =
    useDeleteReportMutation();
  const date = new Date(props.createdAt);

  const localDate = date.toLocaleDateString();
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
    return <h1>Error, unable to delete</h1>;
  }

  return (
    <div className="rounded-2xl" key={props.id}>
      <div className="bg-black px-6 py-2 pb-4 flex rounded-[inherit] justify-between items-start">
        <div className="flex-1">
          <p className=" mt-2 text-white opacity-85 font-semibold">
            {props.subject}
          </p>

          <p className="mt-1 text-sm w-[100%]  text-[#cdcccc]">
            {props.description}
          </p>
        </div>
        <div className="flex-1"></div>
        <div className="flex-1 flex flex-col items-end">
          <div>
            <div className="flex justify-between items-center">
              <button
                className="w-8 mr-2 border-white border rounded-lg"
                onClick={() => {
                  props.setUpdateForm({
                    id: props.id,
                    show: true,
                  });
                }}
              >
                <img src={editIcon} alt="" />
              </button>
              <button
                onClick={async () => {
                  try {
                    const result = await deleteReport(props.id);
                    console.log(result);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="w-8 border-white border rounded-lg"
              >
                <img className="w-full" src={deleteIcon} alt="" />
              </button>
            </div>
            <div className="mt-[1.1rem] text-[#467FD0]">
              <p
                className={`mt-1 text-xs text-center ${
                  props.status === "pending"
                    ? "text-[#f0ad4e]"
                    : "text-[#5cb85c]"
                }`}
              >
                <span className="font-semibold">status:</span> {props.status}
              </p>
              <p className="text-[12px] mt-3">{localDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] rounded-[inherit] border-none bg-white"></div>
    </div>
  );
}
