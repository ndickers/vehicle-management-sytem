import successIcon from "../../../assets/success-icon.png";
import { useNavigate } from "react-router-dom";

export default function SuccessPayment() {
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
        <div className="bg-white p-5 pb-8 rounded-lg flex flex-col justify-center items-center w-[20rem]">
          <img src={successIcon} alt="" />
          <p className="text-black text-xl text-center font-bold">
            Payment successfully
          </p>
        </div>
      </div>
    </div>
  );
}
