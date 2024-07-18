import carImg from "../assets/car-img.jpg";
import { useState } from "react";

export default function Car({ onClick }) {
  const [showSpec, setShowSpec] = useState(false);

  return (
    <div className="w-[15rem] bg-white text-black contain-content rounded-xl p-4">
      <img className="w-full h-[10rem] object-cover " src={carImg} alt="" />
      <div className="mt-4 w-full">
        <p>
          <span className="font-semibold">Name:</span> Toyota
        </p>
        <p>
          <span className="font-semibold">Available:</span> yes
        </p>
        <p>
          <span className="font-semibold">Rent rate:</span> $200 per hr
        </p>
        {!showSpec && (
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
              <span className="font-semibold">Manufacturer:</span> Toyota
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Model:</span> yes
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Year:</span> $200 per hr
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Engine capacity:</span> 200cc hr
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Fuel type:</span> diesel
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Number of seat:</span> 4 hr
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">color:</span> navy blue
            </p>
            <p className="text-sm mt-[2px]">
              <span className="font-semibold">Features:</span> spoilers
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
          onClick={onClick}
          className="bg-black block rounded-md py-1 px-3  text-white"
        >
          book car
        </button>
        <p className="text-xs">
          <span className="font-semibold">Time:</span> 20:08:21
        </p>
      </div>
    </div>
  );
}
