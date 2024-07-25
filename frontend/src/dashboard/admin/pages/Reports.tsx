import ReportForm from "../../../components/adminForms/ReportForm";
import { useState } from "react";
import {
  useGetAllReportsQuery,
  useDeleteReportMutation,
} from "../../../features/api/vehiclesApi";
import { BallTriangle } from "react-loader-spinner";
export default function Reports() {
  const [showReportForm, setShowReportForm] = useState({
    report: null,
    show: false,
  });
  const {
    data: reports,
    error,
    isLoading,
    isError,
  } = useGetAllReportsQuery({});
  const [
    deleteReport,
    { isError: deleteIsError, error: deleteError, isLoading: deleteIsLoading },
  ] = useDeleteReportMutation();
  async function handleDeleteReport(id) {
    try {
      const result = await deleteReport(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const tableRow = reports?.map((report) => {
    return (
      <tr key={report.id}>
        <td className="vehicle-td-style">{report.id}</td>
        <td className="vehicle-td-style">{report.userId}</td>
        <td className="vehicle-td-style">{report.subject}</td>
        <td className="vehicle-td-style">{report.description}</td>
        <td className="vehicle-td-style">{report.status}</td>
        <td className="vehicle-td-style">{report.createdAt}</td>
        <td className="vehicle-td-style ">
          <button
            onClick={() => {
              setShowReportForm({ report, show: true });
            }}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            edit
          </button>
          <button
            onClick={() => handleDeleteReport(report.id)}
            className="mx-2 text-xs rounded-md bg-black px-1 text-white py-1"
          >
            delete
          </button>
        </td>
      </tr>
    );
  });
  if (isError) {
    console.log(error);
    return <h1>server error, unable to update report</h1>;
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
    return <h1>server error, unable to delete</h1>;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage reports</h1>
        </div>
        <div className="text-black h-[60vh] overflow-scroll">
          <table className="table-auto  text-center border border-black bg-slate-300">
            <tr className="border border-black bg-slate-400">
              <th className="vehicle-td-style">id</th>
              <th className="vehicle-td-style">user id</th>
              <th className="vehicle-td-style">subject</th>
              <th className="vehicle-td-style">description</th>
              <th className="vehicle-td-style">status</th>
              <th className="vehicle-td-style">created at</th>
              <th className="vehicle-td-style">modification</th>
            </tr>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td>No data</td>
              </tr>
            ) : (
              tableRow
            )}
          </table>
        </div>
      </div>
      {showReportForm.show && (
        <ReportForm
          report={showReportForm.report}
          setShowReportForm={setShowReportForm}
        />
      )}
    </div>
  );
}
