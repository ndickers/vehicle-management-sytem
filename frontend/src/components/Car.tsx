import { useState } from "react";

export default function Car(props: any) {
  const [showSpec, setShowSpec] = useState(false);

  const date = new Date(props.createdAt);

  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();
  return (
    <div className=" bg-white w-[100%] md:max-w-[15rem] text-black contain-content rounded-xl p-4">
      <img
        className="w-full h-[10rem] object-cover "
        src={props.image}
        alt=""
      />
      <div className="mt-4 w-full">
        <p>
          <span className="font-semibold">Name:</span>
          {props?.vehicle_specification?.model}
        </p>
        <p>
          <span className="font-semibold">Available:</span>{" "}
          {props.availability ? "yes" : "no"}
        </p>
        <p>
          <span className="font-semibold">Rent rate:</span>{" "}
          {`$${props?.rentRate} per hr`}
        </p>
        {props.vehicle_specification !== null && !showSpec && (
          <button
            onClick={() => setShowSpec(true)}
            className="mt-2 underline text-[#467FD0]"
          >
            more details
          </button>
        )}
        {/* specification */}
        {showSpec && (
          <div>
            <p className="text-sm mt-1">
              <span className="font-semibold">Manufacturer:</span>{" "}
              {props.vehicle_specification.manufacturer}
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Model:</span>{" "}
              {props.vehicle_specification.model}
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Year:</span>{" "}
              {props.vehicle_specification.year}
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Engine capacity:</span>{" "}
              {props.vehicle_specification.engineCapacity}
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Fuel type:</span>{" "}
              {props.vehicle_specification.fuelType}
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Number of seat:</span>{" "}
              {props.vehicle_specification.seatingCapacity}
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">color:</span>{" "}
              {props.vehicle_specification.color}
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Features:</span>{" "}
              {props.vehicle_specification.features}
            </p>
            <button
              onClick={() => setShowSpec(false)}
              className="mt-2 underline text-[#467FD0]"
            >
              less details
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={props.onClick}
          className="bg-black block rounded-md py-1 px-3  text-white"
        >
          book car
        </button>
        <div>
          <p className="text-[10px]">
            <span className="font-semibold">Date:</span> {localDate}
          </p>
          <p className="text-[10px]">
            <span className="font-semibold">Time:</span> {localTime}
          </p>
        </div>
      </div>
    </div>
  );
}
