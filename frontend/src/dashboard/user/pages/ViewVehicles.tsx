import DashHeader from "./DashHeader";
import Car from "../../../components/Car";
import { useState } from "react";
import BookingForm from "../../../components/userForm/BookingForm";
import { useGetVehiclesQuery } from "../../../features/api/vehiclesApi";

export default function ViewVehicles() {
  const [showBookForm, setShowBookForm] = useState({
    show: false,
    amount: null,
    vehicleId: null,
  });
  const { data: vehicles, isLoading, error, isError } = useGetVehiclesQuery({});

  
  if (isError) {
    console.log(error);
    return <h1>An error has occured</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(vehicles);
  if (!vehicles || !vehicles.data) {
    return <h1>No vehicles found</h1>;
  }

  const displayVehicles = vehicles.data.map((vehicle:any) => (
    <Car
      id={vehicle.id}
      {...vehicle}
      onClick={() =>
        setShowBookForm((prevData) => ({
          ...prevData,
          show: true,
          amount: vehicle.rentRate,
          vehicleId: vehicle.id,
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
          showBookForm={showBookForm}
          setShowBookForm={setShowBookForm}
        />
      )}
    </div>
  );
}
