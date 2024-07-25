import LocationForm from "../../../components/adminForms/LocationForm";
import { useState } from "react";
import {
  useGetLocationQuery,
  useDeleteLocationMutation,
} from "../../../features/api/vehiclesApi";
import { BallTriangle } from "react-loader-spinner";
export default function Users() {
  const [showLocationForm, setShowLocationForm] = useState({
    location: null,
    show: false,
  });
  const [update, setUpdate] = useState(false);
  const {
    data: locations,
    error,
    isError,
    isLoading,
  } = useGetLocationQuery({});
  const [
    deleteLocation,
    { isError: deleteIsError, error: deleteError, isLoading: deleteIsLoading },
  ] = useDeleteLocationMutation();
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
    return <h1>server error, unable to get location</h1>;
  }

  async function handleDeleteLocation(id) {
    try {
      const result = await deleteLocation(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const tableRow = locations?.map((location) => {
    return (
      <tr key={location.id}>
        <td className="vehicle-td-style">{location.id}</td>
        <td className="vehicle-td-style">{location.name}</td>
        <td className="vehicle-td-style">{location.address}</td>
        <td className="vehicle-td-style">{location.phone}</td>
        <td className="vehicle-td-style">{location.createdAt}</td>
        <td className="vehicle-td-style ">
          <button
            onClick={() => {
              setShowLocationForm({ location: location, show: true });
              setUpdate(true);
            }}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            edit
          </button>
          <button
            onClick={() => handleDeleteLocation(location.id)}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            delete
          </button>
        </td>
      </tr>
    );
  });

  if (deleteIsLoading) {
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
  if (deleteIsError) {
    console.log(deleteError);
    return <h1>server error, unable to location</h1>;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage location</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => {
              setShowLocationForm((prevData) => ({ ...prevData, show: true }));
              setUpdate(false);
            }}
          >
            create location
          </button>
        </div>
        <div className="text-black h-[60vh] overflow-scroll">
          <table className="table-auto  text-center border border-black bg-slate-300">
            <tr className="border border-black bg-slate-400">
              <th className="vehicle-td-style">id</th>
              <th className="vehicle-td-style">name</th>
              <th className="vehicle-td-style">address</th>
              <th className="vehicle-td-style">contact</th>
              <th className="vehicle-td-style">createdAt</th>
              <th className="vehicle-td-style">modification</th>
            </tr>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : locations.length === 0 ? (
              <tr>
                <td>No data</td>
              </tr>
            ) : (
              tableRow
            )}
          </table>
        </div>
      </div>

      {showLocationForm.show && (
        <LocationForm
          update={update}
          location={showLocationForm.location}
          setShowLocationForm={setShowLocationForm}
        />
      )}
    </div>
  );
}
