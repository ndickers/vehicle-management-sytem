import { useState } from "react";
import successIcon from "../../../assets/success-icon.png";
export default function SuccessPayment() {
  const [showSuccess, setShowSuccess] = useState(true);
  return (
    <div>
      {showSuccess && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSuccess(false);
            }
          }}
          className="bg-black flex justify-center items-center opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-8"
        >
          <div className="bg-white p-5 pb-8 rounded-lg flex flex-col justify-center items-center w-[20rem]">
            <img src={successIcon} alt="" />
            <p className="text-black text-xl text-center font-bold">Payment successfully</p>
          </div>
        </div>
      )}
    </div>
  );
}
