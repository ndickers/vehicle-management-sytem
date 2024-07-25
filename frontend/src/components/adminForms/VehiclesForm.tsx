import { useForm } from "react-hook-form";
import {
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
} from "../../features/api/vehiclesApi";
import axios from "axios";
import { useEffect } from "react";
import { BallTriangle } from 'react-loader-spinner';
export default function VehiclesForm({ setShowVehicleForm, vehicle, update }) {
  const { register, handleSubmit, reset } = useForm();
  const [createVehicle, { isLoading, isError, error }] =
    useCreateVehicleMutation();
  const [
    updateVehicle,
    { isLoading: updateIsLoading, isError: updateIsError, error: updateError },
  ] = useUpdateVehicleMutation();
  useEffect(() => {
    if (vehicle !== null) {
      reset(vehicle);
    }
  }, [vehicle, reset]);

  async function submitVehicle(data) {
    const image = data.file[0];

    // update vehicles
    if (update) {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", import.meta.env.VITE_PRESET_KEY);
        try {
          const { data: imageUrl } = await axios.post(
            "https://api.cloudinary.com/v1_1/du9vpm7jj/image/upload",
            formData
          );
          // implement post logic here
          const vehicleDetails = {
            image: imageUrl.url,
            availability: data.availability,
            rentRate: Number(data.rentRate),
          };
          const result = await updateVehicle({
            vehicle: vehicleDetails,
            id: vehicle.id,
          }).unwrap();
          reset();
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      } else {
        const vehicleDetails = {
          availability: data.availability,
          rentRate: Number(data.rentRate),
        };
        const result = await updateVehicle({
          vehicle: vehicleDetails,
          id: vehicle.id,
        }).unwrap();
        reset();
        console.log(result);
        console.log(false);
      }
    }

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", import.meta.env.VITE_PRESET_KEY);


      try {
        const { data: imageUrl } = await axios.post(
          "https://api.cloudinary.com/v1_1/du9vpm7jj/image/upload",
          formData
        );
        // implement post logic here
        const vehicleDetails = {
          image: imageUrl.url,
          availability: data.availability,
          rentRate: Number(data.rentRate),
        };
        const result = await createVehicle(vehicleDetails).unwrap();
        reset();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (isError) {
    console.log(error);
    return <h1>Server error, unable to create vehicle</h1>;
  }
  
  if (updateIsLoading || isLoading) {
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
  if (updateIsError) {
    console.log(updateError);

    return <h1>Server error, unable to update vehicle</h1>;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowVehicleForm((prevData) => ({ ...prevData, show: false }));
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute p-32"
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {update ? "update vehicle" : "Add vehicle"}
      </h1>
      <form
        onSubmit={handleSubmit(submitVehicle)}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("file")}
          className="update-form "
          type="file"
          placeholder="car image"
        />
        <input
          {...register("rentRate")}
          className="update-form bg-white text-black"
          type="number"
          placeholder="car rent rate"
        />
        <label htmlFor="">
          Available
          <input
            {...register("availability")}
            className="update-form ml-4"
            type="checkbox"
            placeholder="availability"
          />
        </label>
        <button className="submit-btn ">
          {update ? "update vehicle" : "post vehicle"}
        </button>
      </form>
    </div>
  );
}
