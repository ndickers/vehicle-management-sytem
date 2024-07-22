import { useState } from "react";
import VehiclesForm from "../../../components/adminForms/VehiclesForm";
import VehicleSpecForm from "../../../components/adminForms/VehicleSpecForm";
import { useGetVehiclesQuery } from "../../../features/api/vehiclesApi";
export default function Vehicles() {
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showSpecForm, setShowSpecForm] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  const { data: vehicles, isLoading, error, isError } = useGetVehiclesQuery({});

  if (isError) {
    console.log(error);
    return <h1>Server error, unable to fetch data</h1>;
  }
  if (isLoading) {
    <h1>loading...</h1>;
  }

  const tableRow = vehicles?.data.map((vehicle) => {
    return (
      <tr key={vehicle.id}>
        <td className="vehicle-td-style">{vehicle.id}</td>
        <td className="vehicle-td-style">{vehicle.rentRate}</td>
        <td className="vehicle-td-style">{vehicle.availability}</td>
        <td className="vehicle-td-style">{vehicle.image}</td>
        <td className="vehicle-td-style">{vehicle.createdAt}</td>
        <td className="vehicle-td-style">{vehicle.updatedAt}</td>
        <td className="vehicle-td-style p-1">
          <button
            onClick={() => {
              setShowSpecForm(true);
              setVehicleId(vehicle.id)
            }}
            className="text-xs rounded-md bg-black px-1 text-white py-1"
          >
            add specification
          </button>
        </td>
        <td className="vehicle-td-style ">
          <button className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1">
            edit
          </button>
          <button className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1">
            delete
          </button>
        </td>
      </tr>
    );
  });
  console.log(vehicles);

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage vehicles</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => setShowVehicleForm(true)}
          >
            Add vehicle
          </button>
        </div>

        <div className="bg-white max-h-[100vh] overflow-x-auto text-black">
          <table className="table-auto  text-center border border-black bg-slate-300">
            <tr className="border border-black bg-slate-400">
              <th className="vehicle-td-style">id</th>
              <th className="vehicle-td-style">rental rate</th>
              <th className="vehicle-td-style">availability</th>
              <th className="vehicle-td-style">image</th>
              <th className="vehicle-td-style">created at</th>
              <th className="vehicle-td-style">updated at</th>
              <th className="vehicle-td-style">add specification</th>
              <th className="vehicle-td-style">modification</th>
            </tr>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : vehicles.length === 0 ? (
              <tr>
                <td>No data</td>
              </tr>
            ) : (
              tableRow
            )}
          </table>
        </div>
      </div>
      {showVehicleForm && (
        <VehiclesForm setShowVehicleForm={setShowVehicleForm} />
      )}
      {showSpecForm && (
        <VehicleSpecForm
          vehicleId={vehicleId}
          setShowSpecForm={setShowSpecForm}
        />
      )}
    </div>
  );
}
