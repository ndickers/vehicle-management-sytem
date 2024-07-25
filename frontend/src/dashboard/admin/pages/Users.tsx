import UsersForm from "../../../components/adminForms/UsersForm";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../features/api/vehiclesApi";
export default function Users() {
  const [showUserForm, setShowUserForm] = useState({ user: null, show: false });
  const [update, setUpdate] = useState(false);
  const { data: users, isLoading, isError, error } = useGetUsersQuery({});
  const [
    deleteUser,
    { isLoading: deleteIsLoading, error: deleteError, isError: deleteIsError },
  ] = useDeleteUserMutation();

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

    return <h1>Server error, unable to get users</h1>;
  }
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
    return <tr>Server error, nable to delete user</tr>;
  }
  async function handleDeleteUser(id) {
    try {
      const result = await deleteUser(id).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const tableRow = users?.map((user) => {
    return (
      <tr key={user.id}>
        <td className="vehicle-td-style">{user.id}</td>
        <td className="vehicle-td-style">{user.fullname}</td>
        <td className="vehicle-td-style">{user.email}</td>
        <td className="vehicle-td-style">{user.phone}</td>
        <td className="vehicle-td-style">{user.role}</td>
        <td className="vehicle-td-style">{user.address}</td>
        <td className="vehicle-td-style">{user.createdAt}</td>
        <td className="vehicle-td-style ">
          <button
            onClick={() => {
              setShowUserForm({ user, show: true });
              setUpdate(true);
            }}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            edit
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            delete
          </button>
        </td>
      </tr>
    );
  });
  console.log(users);

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage users</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => {
              setShowUserForm({ user: null, show: true });
              setUpdate(false);
            }}
          >
            create user
          </button>
        </div>
        <div className="text-black h-[60vh] overflow-scroll">
          <table className="table-auto  text-center border border-black bg-slate-300">
            <tr className="border border-black bg-slate-400">
              <th className="vehicle-td-style">id</th>
              <th className="vehicle-td-style">fullname</th>
              <th className="vehicle-td-style">email</th>
              <th className="vehicle-td-style">phone</th>
              <th className="vehicle-td-style">role</th>
              <th className="vehicle-td-style">address</th>
              <th className="vehicle-td-style">created at</th>
              <th className="vehicle-td-style">modification</th>
            </tr>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : users !== undefined && users.length === 0 ? (
              <tr>
                <td>No data</td>
              </tr>
            ) : (
              tableRow
            )}
          </table>
        </div>
      </div>
      {showUserForm.show && (
        <UsersForm
          update={update}
          userDetail={showUserForm.user}
          setShowUserForm={setShowUserForm}
        />
      )}
    </div>
  );
}
