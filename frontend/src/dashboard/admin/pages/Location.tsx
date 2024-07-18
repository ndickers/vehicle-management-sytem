import LocationForm from "../../../components/adminForms/LocationForm";
import { useState } from "react";
export default function Users() {
  const [showLocationForm, setShowLocationForm] = useState(false);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage location</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => setShowLocationForm(true)}
          >
            create location
          </button>
        </div>
      </div>
      {showLocationForm && (
        <LocationForm setShowLocationForm={setShowLocationForm} />
      )}
    </div>
  );
}
