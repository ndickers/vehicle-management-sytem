import DashHeader from "./DashHeader";
import BookedCar from "../../../components/BookedCar";
import {
  useGetUserQuery,
  useCreateCheckoutMutation,
} from "../../../features/api/vehiclesApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

export default function BookedVehicle() {
  const userInfo = useSelector((state: RootState) => state.loginUser);
  console.log({ userInfoIs: userInfo.user.id });

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
  if (isLoading) {
    bookList = <p>loading...</p>;
  } else if (isError) {
    console.log(error);
    bookList = <p className="">Server error, can't get booked vehicle</p>;
  } else if (userBookedVehicle && userBookedVehicle[0].bookings.length !== 0) {
    const { bookings } = userBookedVehicle[0];
    console.log(bookings);
    const unpaidbookings = bookings.filter(
      (book) => book.bookingStatus === "unpaid"
    );

    bookList = unpaidbookings.map((book) => (
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
    console.log(result);
  }
  if (checkoutIsLoading) {
    return <h1>processing payment...</h1>;
  }
  if (checkoutIsError) {
    console.log(checkoutError);
    return <h1>Server error, unable to process payment</h1>;
  }

  return (
    <div className="px-16 pt-12 w-full">
      <DashHeader title="booked vehicle" />
      <div className="w-[100%] flex justify-end items-center my-3">
        <form onSubmit={handleCheckoutSubmit}>
          <button className="  bg-[#467FD0] text-sm font-bold p-2 rounded-lg">
            Proceed to payment
          </button>
        </form>
      </div>
      <div className="h-[100vh] mt-8 rounded-3xl bg-black">{bookList}</div>
    </div>
  );
}
