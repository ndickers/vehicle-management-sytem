import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

export default function BookedCar(props:any) {
  const date = new Date(props.createdAt);

  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();

  return (
    <div className="rounded-2xl">
      <div className="bg-black px-6 py-2 pb-4 flex rounded-[inherit] justify-between items-start">
        <div className="flex-1">
          <p className=" text-[#cdcccc]">
            <span className="font-semibold text-white">model:</span>
            {props.vehicles.vehicle_specification.model}
          </p>

          <p className="mt-1  text-[#cdcccc]">
            <span className="font-semibold text-white">amount:</span> $
            {" " + props.totalAmount}
          </p>
          <p className="mt-1  text-[#cdcccc]">
            <span className="font-semibold text-white">return date:</span>{" "}
            {props.returnDate}
          </p>
        </div>
        <div className="flex-1">
          <p
            className={`mt-1 text-sm text-center ${
              props.bookingStatus === "unpaid"
                ? "text-[#f0ad4e]"
                : "text-[#5cb85c]"
            }`}
          >
            <span className="font-semibold">status:</span> {props.bookingStatus}
          </p>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div>
            <div className="flex justify-between items-center">
              <button className="w-8 mr-2 border-white border rounded-lg">
                <img src={editIcon} alt="" />
              </button>
              <button className="w-8 border-white border rounded-lg">
                <img className="w-full" src={deleteIcon} alt=""  />
              </button>
            </div>
            <div className="mt-[1.1rem] text-[#467FD0]">
              <p className="text-[12px]">
                <span className="font-semibold">Date:</span> {localDate}
              </p>
              <p className="text-[12px]">
                <span className="font-semibold">Time:</span> {localTime}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] border-none bg-white"></div>
    </div>
  );
}
