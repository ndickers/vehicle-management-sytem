import UsersForm from "../../../components/adminForms/UsersForm";
import { useState } from "react";
export default function Users() {
  const [showUserForm, setShowUserForm] = useState(false);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage users</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => setShowUserForm(true)}
          >
            create user
          </button>
        </div>
      </div>
      {showUserForm && <UsersForm setShowUserForm={setShowUserForm} />}
    </div>
  );
}
