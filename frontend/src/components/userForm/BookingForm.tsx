import { useForm } from "react-hook-form";
import { useGetLocationQuery } from "../../features/api/vehiclesApi";
import { useState } from "react";

export default function BookingForm({ setShowBookForm, amount }) {
  const { data: location, isError, error, isLoading } = useGetLocationQuery();
  const [calculatedHours, setCalculatedHours] = useState(2);

  if (isError) {
    console.log(error);
  }

  const locationOptions = location?.map(({ name, id }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate >= currentDate || "Date must be today or later";
  };

  function submitBooking(data) {
    console.log(data);
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowBookForm((prevData) => ({ ...prevData, show: false }));
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute p-8"
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
            const selectedDate = new Date(e.target.value);
            const currentDate = new Date();
            const differenceInHours =
              Math.abs(selectedDate - currentDate) / 3600000;
            setCalculatedHours(Math.floor(differenceInHours));
          }}
          className="update-form "
          type="date"
          placeholder="returning date"
        />
        {errors.returnDate !== undefined && (
          <p className="text-[#d9534f]">{errors?.returnDate.message}</p>
        )}
        <input
          {...register("totalAmount", { required: "total amount is required" })}
          className="update-form bg-white"
          value={amount * calculatedHours}
          type="number"
          placeholder="total amount"
          readOnly
        />
        <select
          {...register("location", {
            validate: (value) => value !== "null" || "select location",
          })}
          placeholder="select location"
          className="update-form text-black"
          name="location"
        >
          {isError && <option value="">unable to get location</option>}
          <option value="null">
            {isLoading ? "scanning available location..." : "select location"}
          </option>
          {locationOptions}
        </select>
        {errors.location !== undefined && (
          <p className="text-[#d9534f]">{errors?.location.message}</p>
        )}
        <button className="submit-btn ">book car</button>
      </form>
    </div>
  );
}
