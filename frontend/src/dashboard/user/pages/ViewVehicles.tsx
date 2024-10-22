import Car from "../../../components/Car";
import { useState } from "react";
import BookingForm from "../../../components/userForm/BookingForm";
import { useGetVehiclesQuery } from "../../../features/api/vehiclesApi";
import { BallTriangle } from "react-loader-spinner";

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

  console.log(vehicles);
  if (!vehicles || !vehicles.data) {
    return <h1>No vehicles found</h1>;
  }

  const displayVehicles = vehicles.data.map((vehicle: any) => (
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
    <div className=" w-[100%]">
      <div className=" overflow-auto h-full md:mt-12 flex gap-6 md:gap-12 flex-wrap items-start">
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
