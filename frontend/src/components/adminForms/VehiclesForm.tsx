import { useForm } from "react-hook-form";
import { useCreateVehicleMutation } from "../../features/api/vehiclesApi";
import axios from "axios";

export default function VehiclesForm({ setShowVehicleForm }) {
  const { register, handleSubmit, reset } = useForm();
  const [createVehicle, { isLoading }] = useCreateVehicleMutation();

  async function submitVehicle(data) {
    const image = data.file[0];

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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowVehicleForm(false);
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute p-32"
    >
      <h1 className="text-center text-2xl font-bold mb-6">Add vehicle</h1>
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
        <button className="submit-btn ">post vehicle</button>
      </form>
    </div>
  );
}
