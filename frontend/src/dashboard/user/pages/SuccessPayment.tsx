import successIcon from "../../../assets/success-icon.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import { useUpdateBookingMutation } from "../../../features/api/vehiclesApi";

export default function SuccessPayment() {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.loginUser);
  const [updateBooking, { isError: bookingIsError, error: bookingError }] =
    useUpdateBookingMutation();

  useEffect(() => {
    async function updateBookingEffect() {
      await updateBooking({
        book: { bookingStatus: "paid" },
        id: userInfo.user.id,
      }).unwrap();
    }
    updateBookingEffect();
  }, []);
  if (bookingIsError) {
    console.log(bookingError);
  }
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
