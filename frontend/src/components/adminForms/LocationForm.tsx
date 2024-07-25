import { useForm, FieldError } from "react-hook-form";
import {
  useCreateLocationMutation,
  useUpdateLocationMutation,
} from "../../features/api/vehiclesApi";
import { useEffect } from "react";
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export default function LocationForm({
  setShowLocationForm,
  location,
  update,
}) {
  const [createLocation, { isLoading, error, isError }] =
    useCreateLocationMutation();
  const [
    updateLocation,
    { isLoading: updateIsLoading, isError: updateIsError, error: updateError },
  ] = useUpdateLocationMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (location !== null) {
      if (update) {
        reset({
          phone: location.phone,
          address: location.address,
          name: location.name,
        });
      }
    }
  }, [reset, update, location]);
  async function submitLocation(data) {
    if (location === null) {
      try {
        const result = await createLocation(data).unwrap();
        toast.success("location created")
        setShowLocationForm((prevData) => ({
          ...prevData,
          show: false,
        }));
        console.log(result);
        reset();
      } catch (error) {
        console.log(error);
      }
    } else {
      if (update === true) {
        try {
          const result = await updateLocation({
            location: data,
            id: location.id,
          });
          toast.success("location update successfull")
          console.log(result);
          reset();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  if (isError) {
    console.log(error);
    toast.error("location creation failed")
    return (
      <h1 className="text-[#d9534f]">
        Server error. Unable to create location
      </h1>
    );
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
    toast.success("location update successful")
    return <h1>server error, unable to update</h1>;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowLocationForm((prevData) => ({
            ...prevData,
            show: false,
          }));
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute p-32"
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {update ? "update location" : "Add location"}
      </h1>
      <form
        onSubmit={handleSubmit(submitLocation)}
        action=""
        className="mb-8 m-auto flex flex-col max-w-[25rem]"
      >
        <input
          {...register("name", { required: "City is required" })}
          className="update-form "
          type="text"
          placeholder="city"
        />
        {errors.subject !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.name as FieldError)?.message ||
              "maintenance cost error message not available"}
          </p>
        )}

        <input
          {...register("phone", { required: "Name is required" })}
          className="update-form "
          type="number"
          placeholder="phone"
        />
        {errors.subject !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.phone as FieldError)?.message ||
              "phone error message not available"}
          </p>
        )}

        <input
          {...register("address", { required: "Name is required" })}
          className="update-form"
          type="text"
          placeholder="address"
        />
        {errors.subject !== undefined && (
          <p className="text-[#d9534f]">
            {(errors.address as FieldError)?.message ||
              "address error message not available"}
          </p>
        )}

        <button className="submit-btn ">
          {update ? "update location" : "post location"}
        </button>
      </form>
    </div>
  );
}
