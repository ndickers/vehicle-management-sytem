import { useState } from "react";
import failedIcon from "../../../assets/cancel-icon.png";
export default function FailedPayment() {
  const [showFailed, setShowFailed] = useState(true);
  return (
    <div>
      {showFailed && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFailed(false);
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
      )}
    </div>
  );
}
