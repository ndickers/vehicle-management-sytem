import DashHeader from "./DashHeader";
import Car from "../../../components/Car";
import { useState } from "react";
import BookingForm from "../../../components/userForm/BookingForm";
import { useGetVehiclesQuery } from "../../../features/api/vehiclesApi";

export default function ViewVehicles() {
  const [showBookForm, setShowBookForm] = useState(false);
  const { data: vehicles, isLoading, error, isError } = useGetVehiclesQuery();
  if (isError) {
    console.log(error);
    return <h1>An error has occured</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    console.log(vehicles);
    return <p>data</p>;
  }

  return (
    <div className="px-16 pt-12 w-full">
      <DashHeader title="vehicles" />
      <div className=" overflow-auto h-full mt-12 flex gap-12 flex-wrap items-start">
        <Car onClick={() => setShowBookForm(true)} />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
      </div>
      {showBookForm && <BookingForm setShowBookForm={setShowBookForm} />}
    </div>
  );
}
