import FleetForm from "../../../components/adminForms/FleetForm";
import { useState } from "react";
export default function Users() {
  const [showFleetForm, setShowFleetForm] = useState(false);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage fleet</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => setShowFleetForm(true)}
          >
            create fleet
          </button>
        </div>
      </div>
      {showFleetForm && <FleetForm setShowFleetForm={setShowFleetForm} />}
    </div>
  );
}
