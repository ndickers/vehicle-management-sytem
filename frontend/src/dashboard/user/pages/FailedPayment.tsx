import failedIcon from "../../../assets/cancel-icon.png";
import { useNavigate } from "react-router-dom";
export default function FailedPayment() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            navigate("/dashboard/user");
          }
        }}
        className="bg-black flex justify-center items-center opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-8"
      >
        <div className="bg-white p-5 py-16 pb-8 rounded-lg flex flex-col justify-center items-center w-[20rem]">
          <img src={failedIcon} alt="" />
          <p className="text-black mt-6 text-xl text-center font-bold">
            Payment failed
          </p>
        </div>
      </div>
    </div>
  );
}
