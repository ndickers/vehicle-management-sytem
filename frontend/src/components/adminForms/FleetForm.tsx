import { useForm, FieldError } from "react-hook-form";
import {
  useCreateFleetMutation,
  useUpdateFleetMutation,
} from "./../../features/api/vehiclesApi";
import { useEffect } from "react";
import { BallTriangle } from 'react-loader-spinner';
import { toast } from "react-toastify";
export default function FleetForm({ setShowFleetForm, update, fleet }) {
  const [createFleet, { isError, error, isLoading }] = useCreateFleetMutation();
  const [
    updateFleet,
    { isError: fleetIsError, error: fleetError, isLoading: fleetIsLoading },
  ] = useUpdateFleetMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (update) {
      reset({
        vehicleId: Number(fleet.vehicleId),
        acquisitionDate: fleet.acquisitionDate,
        depreciationRate: Number(fleet.depreciationRate),
        currentValue: Number(fleet.currentValue),
        maintenanceCost: Number(fleet.maintenanceCost),
        status: fleet.status,
      });
    }
  }, [update, fleet, reset]);

  async function submitFleet(data) {
    if (fleet === null) {
      const fleetData = {
        ...data,
        vehicleId: Number(data.vehicleId),
        depreciationRate: Number(data.depreciationRate),
        currentValue: Number(data.currentValue),
        maintenanceCost: Number(data.maintenanceCost),
      };
      try {
        const result = await createFleet(fleetData).unwrap();
        toast.success("fleet created successful")
        console.log(result);
        setShowFleetForm(false);
        reset();
      } catch (error) {
        toast.error("fleet creation failed")
        console.log(error);
      }
    } else {
      const fleetData = {
        ...data,
        vehicleId: Number(data.vehicleId),
        depreciationRate: Number(data.depreciationRate),
        currentValue: Number(data.currentValue),
        maintenanceCost: Number(data.maintenanceCost),
      };
      try {
        const result = await updateFleet({ fleet: fleetData, id: fleet.id });
        toast.success("fleet update successfull")
        setShowFleetForm(false);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      console.log("");
    }
  }
  if (isLoading || fleetIsLoading) {
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
  if (isError) {
    console.log(error);
    return <h1>server error, unable to creat fleet</h1>;
  }

  if (fleetIsError) {
    console.log(fleetError);
    return <h1>Server error, unable to update fleet</h1>;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowFleetForm(false);
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute pt-8"
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {update ? "update fleet" : "Add fleet"}
      </h1>
      <form
        onSubmit={handleSubmit(submitFleet)}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("vehicleId", { required: "vehicle id is require" })}
          className="update-form "
          type="number"
          placeholder="vehicle identity"
        />
        {errors.vehicleId !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.vehicleId as FieldError)?.message ||
              "Status error message not available"}
          </p>
        )}

        <input
          {...register("acquisitionDate", {
            required: "return date is required",
          })}
          className="update-form "
          type="date"
          placeholder="acquisition date"
        />
        <input
          {...register("depreciationRate", {
            required: "depreciation rate is required",
          })}
          className="update-form bg-white"
          type="number"
          placeholder="depreciation rate"
        />
        {errors.depreciationRate !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.depreciationRate as FieldError)?.message ||
              "Status error message not available"}
          </p>
        )}
        <input
          {...register("currentValue", {
            required: "current value is required",
          })}
          className="update-form "
          type="number"
          placeholder="current value"
        />
        {errors.currentValue !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.currentValue as FieldError)?.message ||
              "Status error message not available"}
          </p>
        )}
        <input
          {...register("maintenanceCost", {
            required: "maintenance cost is required",
          })}
          className="update-form"
          type="text"
          placeholder="maintenance cost"
        />
        {errors.maintenanceCost !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.maintenanceCost as FieldError)?.message ||
              "maintenance cost error message not available"}
          </p>
        )}
        <select
          {...register("status", { required: "role is required" })}
          className="update-form text-black"
          name="status"
        >
          <option value="new">new</option>
          <option value="good">good</option>
          <option value="fair">fair</option>
          <option value="poor">poor</option>
        </select>
        {errors.role !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.status as FieldError)?.message ||
              "status error message not available"}
          </p>
        )}
        <button className="submit-btn ">
          {update ? "update fleet" : "post fleet"}
        </button>
      </form>
    </div>
  );
}
