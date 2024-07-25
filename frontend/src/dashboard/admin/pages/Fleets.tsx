import FleetForm from "../../../components/adminForms/FleetForm";
import { useState } from "react";
import { useGetFleetQuery } from "../../../features/api/vehiclesApi";
import { useDeleteFleetMutation } from "../../../features/api/vehiclesApi";
import { BallTriangle } from 'react-loader-spinner';
export default function Users() {
  const [showFleetForm, setShowFleetForm] = useState({
    fleet: null,
    show: false,
  });

  const [update, setUpdate] = useState(false);
  const { data: fleets, error, isError, isLoading } = useGetFleetQuery({});
  const [deleteFleet] = useDeleteFleetMutation();

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
  if (isError) {
    console.log(error);

    return <h1>Server error, cannot get vehicles</h1>;
  }
  async function handleDeleteFleet(id) {
    try {
      const result = await deleteFleet(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const tableRow = fleets?.map((fleet: any) => {
    return (
      <tr key={fleet.id}>
        <td className="vehicle-td-style">{fleet.id}</td>
        <td className="vehicle-td-style">{fleet.vehicleId}</td>
        <td className="vehicle-td-style">{fleet.acquisitionDate}</td>
        <td className="vehicle-td-style">{fleet.depreciationRate}</td>
        <td className="vehicle-td-style">{fleet.currentValue}</td>
        <td className="vehicle-td-style">{fleet.maintenanceCost}</td>
        <td className="vehicle-td-style">{fleet.status}</td>
        <td className="vehicle-td-style">{fleet.createdAt}</td>
        <td className="vehicle-td-style ">
          <button
            onClick={() => {
              setShowFleetForm({
                fleet: fleet,
                show: true,
              });
              setUpdate(true);
            }}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            edit
          </button>
          <button
            onClick={() => handleDeleteFleet(fleet.id)}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            delete
          </button>
        </td>
      </tr>
    );
  });



  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage fleet</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => {
              setShowFleetForm((prevData) => ({ ...prevData, show: true }));
              setUpdate(false);
            }}
          >
            create fleet
          </button>
        </div>
        <div className="text-black h-[60vh] overflow-scroll">
          <table className="table-auto  text-center border border-black bg-slate-300">
            <tr className="border border-black bg-slate-400">
              <th className="vehicle-td-style">id</th>
              <th className="vehicle-td-style">vehicle id</th>
              <th className="vehicle-td-style">acquisition date</th>
              <th className="vehicle-td-style">depreciation rate</th>
              <th className="vehicle-td-style">current value</th>
              <th className="vehicle-td-style">maintenance cost</th>
              <th className="vehicle-td-style">status</th>
              <th className="vehicle-td-style">createdAt</th>
              <th className="vehicle-td-style">modification</th>
            </tr>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : fleets.length === 0 ? (
              <tr>
                <td>No data</td>
              </tr>
            ) : (
              tableRow
            )}
          </table>
        </div>
      </div>
      {showFleetForm.show && (
        <FleetForm
          fleet={showFleetForm.fleet}
          update={update}
          setShowFleetForm={setShowFleetForm}
        />
      )}
    </div>
  );
}
