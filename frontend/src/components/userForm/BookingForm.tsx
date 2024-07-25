import { useForm } from "react-hook-form";
import {
  useGetLocationQuery,
  useCreateBookingMutation,
} from "../../features/api/vehiclesApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { BallTriangle } from "react-loader-spinner";

export default function BookingForm({ setShowBookForm, showBookForm }: any) {
  const { data: location, isError, error, isLoading } = useGetLocationQuery({});
  const userInfo = useSelector((state: RootState) => state.loginUser);

  const [
    createBooking,
    { error: createError, isLoading: createIsLoading, isError: createIsError },
  ] = useCreateBookingMutation();
  const [calculatedHours, setCalculatedHours] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (isError) {
    console.log(error);
  }

  const locationOptions = location?.map(
    ({ name, id }: { name: string; id: number }) => (
      <option key={id} value={id}>
        {name}
      </option>
    )
  );

  const validateDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate >= currentDate || "Date must be today or later";
  };

  async function submitBooking({ location, totalAmount, ...data }: any) {
    // change the user id to login user
    const bookedVehicle = {
      ...data,
      userId: userInfo.user.id,
      locationId: Number(location),
      totalAmount: Number(totalAmount * calculatedHours),
      vehicleId: showBookForm.vehicleId,
    };
    try {
      const result = await createBooking(bookedVehicle).unwrap();
      reset();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  if (createIsError) {
    console.log(createError);
    return (
      <h1 className="text-[#d9534f]">Server error occured while booking</h1>
    );
  }

  if (createIsLoading) {
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
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowBookForm((prevData: any) => ({ ...prevData, show: false }));
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0 absolute p-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">Book vehicle</h1>
      <form
        onSubmit={handleSubmit(submitBooking)}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("returnDate", {
            required: "return date is required",
            validate: validateDate,
          })}
          onChange={(e) => {
            const selectedDate: any = new Date(e.target.value);
            const currentDate: any = new Date();
            const differenceInHours: number =
              Math.abs(selectedDate - currentDate) / 3600000;
            setCalculatedHours(Math.floor(differenceInHours));
          }}
          className="update-form "
          type="date"
          placeholder="returning date"
        />
        {errors.returnDate !== undefined && (
          <p className="text-[#d9534f]">
            {errors?.returnDate.message as string}{" "}
          </p>
        )}
        <input
          {...register("totalAmount", { required: "total amount is required" })}
          className="update-form bg-white"
          value={showBookForm.amount * calculatedHours}
          type="number"
          placeholder="total amount"
          readOnly
        />
        <select
          {...register("location", {
            validate: (value) => value !== "null" || "select location",
          })}
          className="update-form text-black"
          name="location"
        >
          <option value="null">
            {isLoading
              ? "scanning available location..."
              : isError
              ? "unable to get location"
              : "select location"}
          </option>
          {locationOptions}
        </select>
        {errors.location !== undefined && (
          <p className="text-[#d9534f]">{errors?.location.message as string}</p>
        )}
        <button className="submit-btn ">book car</button>
      </form>
    </div>
  );
}
