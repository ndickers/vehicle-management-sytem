import { useForm } from "react-hook-form";

export default function VehicleSpecForm({ setShowSpecForm, vehicleId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitVehicleSpec(data) {
    console.log(data);

    console.log(vehicleId);
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowSpecForm(false);
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-4 p-32"
    >
      <h1 className="text-center text-2xl font-bold mb-4">
        vehicle specification
      </h1>
      <form
        onSubmit={handleSubmit(submitVehicleSpec)}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("manufacturer", { required: "manufacturer is require" })}
          className="update-form my-3 px-2 py-1 "
          type="text"
          placeholder="manufacturer"
        />
        {errors.manufacturer !== undefined && (
          <p className="text-[#d9534f]">{errors?.manufacturer.message}</p>
        )}
        <input
          {...register("model", { required: "model is require" })}
          className="update-form my-3 px-2 py-1 "
          type="text"
          placeholder="model"
        />
        {errors.model !== undefined && (
          <p className="text-[#d9534f]">{errors?.model.message}</p>
        )}
        <input
          {...register("year", { required: "year is require" })}
          className="update-form my-3  px-2 py-1 "
          type="number"
          placeholder="year"
        />
        {errors.year !== undefined && (
          <p className="text-[#d9534f]">{errors?.year.message}</p>
        )}
        <select
          {...register("fuelType", { required: "fuel type is require" })}
          className="update-form text-black my-3 px-2 py-1"
          name="fuel type"
        >
          <option value="diesel">diesel</option>
          <option value="petrol">petrol</option>
          <option value="super diesel">super diesel</option>
        </select>
        {errors.fuelType !== undefined && (
          <p className="text-[#d9534f]">{errors?.fuelType.message}</p>
        )}
        <input
          {...register("engineCapacity", {
            required: "engine capacity is require",
          })}
          className="update-form my-3 px-2 py-1"
          type="text"
          placeholder="engine capacity"
        />
        {errors.engineCapacity !== undefined && (
          <p className="text-[#d9534f]">{errors?.engineCapacity.message}</p>
        )}
        <select
          {...register("transmission", { required: "transmission is require" })}
          className="update-form my-3 px-2 py-1 text-black"
          name="Transmission"
        >
          <option value="automatic">automatic</option>
          <option value="manual">manual</option>
          <option value="dual clutch">dual clutch</option>
          <option value="continously variable">continously variable</option>
        </select>
        {errors.transmission !== undefined && (
          <p className="text-[#d9534f]">{errors?.transmission.message}</p>
        )}
        <input
          {...register("seatingCapacity", {
            required: "seat capacity is require",
          })}
          className="update-form my-2 px-2 py-1"
          type="number"
          placeholder="seat capacity"
        />
        {errors.seatingCapacity !== undefined && (
          <p className="text-[#d9534f]">{errors?.seatingCapacity.message}</p>
        )}
        <input
          {...register("color", { required: "color is require" })}
          className="update-form my-3 px-2 py-1"
          type="text"
          placeholder="color"
        />
        {errors.color !== undefined && (
          <p className="text-[#d9534f]">{errors?.color.message}</p>
        )}
        <input
          {...register("features", { required: "features is require" })}
          className="update-form my-3 px-2 py-1"
          type="text"
          placeholder="features"
        />
        {errors.features !== undefined && (
          <p className="text-[#d9534f]">{errors?.features.message}</p>
        )}
        <button className="submit-btn ">add spec</button>
      </form>
    </div>
  );
}
