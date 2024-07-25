import DashHeader from "./DashHeader";
import BookedCar from "../../../components/BookedCar";
import {
  useGetUserQuery,
  useCreateCheckoutMutation,
} from "../../../features/api/vehiclesApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
export default function BookedVehicle() {
  const userInfo = useSelector((state: RootState) => state.loginUser);
  const [successBookings, setSuccessBookings] = useState(false);
  const navigate = useNavigate();
  const {
    data: userBookedVehicle,
    isError,
    error,
    isLoading,
  } = useGetUserQuery(userInfo.user.id);

  const [
    createCheckout,
    {
      error: checkoutError,
      isError: checkoutIsError,
      isLoading: checkoutIsLoading,
    },
  ] = useCreateCheckoutMutation();

  let bookList: JSX.Element | null = null;

  if (isError) {
    console.log(error);
    bookList = <p className="">Server error, can't get booked vehicle</p>;
  } else if (userBookedVehicle && userBookedVehicle[0].bookings.length !== 0) {
    const { bookings } = userBookedVehicle[0];

    const unpaidbookings = bookings.filter(
      (book) => book.bookingStatus === "unpaid"
    );
    const paidbookings = bookings.filter(
      (book) => book.bookingStatus === "paid"
    );

    bookList = (successBookings ? paidbookings : unpaidbookings).map((book) => (
      <BookedCar key={book.id} {...book} />
    ));
  } else {
    bookList = <p>No booked vehicle</p>;
  }

  async function handleCheckoutSubmit(e) {
    e.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51PaWn7A5iTayTj1TbO7D7BahRW7bbfDZVBoraKa4Npn8gEw0sF0j9aXTRNGKtmhAfyRDKAyqZ55qP5rmsQU3Nljt00foGBFxuS"
    );

    const { bookings } = userBookedVehicle[0];

    const unpaidbookings = bookings.filter(
      (book) => book.bookingStatus === "unpaid"
    );
    const { sessionId } = await createCheckout(unpaidbookings).unwrap();

    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      navigate("/dashboard/user/cancel");
    } else {
      navigate("/dashboard/user/success");
    }
  }

  if (checkoutIsError) {
    console.log(checkoutError);
    return <h1>Server error, unable to process payment</h1>;
  }
  if (isLoading || checkoutIsLoading) {
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
  return (
    <div className="px-16 pt-12 w-full">
      <DashHeader title="booked vehicle" />
      <div className="w-[100%] flex justify-between items-center my-3">
        <button
          className="underline text-[#467FD0] ml-4 font-semibold my-2 "
          onClick={() => setSuccessBookings((prevState) => !prevState)}
        >
          {successBookings ? "unpaid bookings" : "paid booking"}
        </button>
        {!successBookings && (
          <form onSubmit={handleCheckoutSubmit}>
            <button className="  bg-[#467FD0] text-sm font-bold p-2 rounded-lg">
              Proceed to payment
            </button>
          </form>
        )}
      </div>
      <h1
        className={`text-xl font-semibold text-center ${
          successBookings ? "text-[#5cb85c]" : "text-[#f0ad4e]"
        }`}
      >
        {successBookings ? "successfull bookings" : "pending bookings"}
      </h1>
      <div className="h-[100vh] mt-8 rounded-3xl bg-black">{bookList}</div>
    </div>
  );
}
