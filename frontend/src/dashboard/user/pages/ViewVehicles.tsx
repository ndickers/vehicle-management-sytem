import DashHeader from "./DashHeader";
import Car from "../../../components/Car";
import { useState } from "react";
import BookingForm from "../../../components/userForm/BookingForm";
import { useGetVehiclesQuery } from "../../../features/api/vehiclesApi";

export default function ViewVehicles() {
  const [showBookForm, setShowBookForm] = useState({
    show: false,
    amount: null,
  });
  const { data: vehicles, isLoading, error, isError } = useGetVehiclesQuery();
  if (isError) {
    console.log(error);
    return <h1>An error has occured</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const displayVehicles = vehicles.data.map((vehicle) => (
    <Car
      id={vehicle.id}
      {...vehicle}
      onClick={() =>
        setShowBookForm((prevData) => ({
          ...prevData,
          show: true,
          amount: vehicle.rentRate,
        }))
      }
    />
  ));
  return (
    <div className="px-16 pt-12 w-full">
      <DashHeader title="vehicles" />
      <div className=" overflow-auto h-full mt-12 flex gap-12 flex-wrap items-start">
        {displayVehicles}
      </div>
      {showBookForm.show && (
        <BookingForm
          amount={showBookForm.amount}
          setShowBookForm={setShowBookForm}
        />
      )}
    </div>
  );
}
