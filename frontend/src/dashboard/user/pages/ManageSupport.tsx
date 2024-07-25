import DashHeader from "./DashHeader";
import { useGetReportsQuery } from "../../../features/api/vehiclesApi";
import { useSelector } from "react-redux";
import ContactReport from "../../../components/ContactReport";
import CustomerReportForm from "../../../components/userForm/CustomerReportForm";
import { useState } from "react";
import { RootState } from "../../../app/store";
import { BallTriangle } from "react-loader-spinner";
export default function ManageSupport() {
  const userInfo = useSelector((state: RootState) => state.loginUser);
  const {
    data: reports,
    error,
    isError,
    isLoading,
  } = useGetReportsQuery(userInfo.user.id);
  const [updateForm, setUpdateForm] = useState({ id: null, show: false });

  let displayReports = undefined;

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
    displayReports = <h1>Server error, can't get reports</h1>;
  }

  if (reports !== undefined) {
    if (reports.length === 0) {
      displayReports = <h1>No report submitted</h1>;
    }
    displayReports = reports.map((report: any) => (
      <ContactReport setUpdateForm={setUpdateForm} id={report.id} {...report} />
    ));
  } else {
    displayReports = <h1>you haven't report anything yet</h1>;
  }

  console.log(updateForm);

  return (
    <div className="px-16  pt-12 w-full">
      <DashHeader title="Manage support" />
      <div className="text-black h-[80%] overflow-scroll">
        <div className="bg-black mt-8 rounded-2xl  h-[60vh]">
          {displayReports}
        </div>
      </div>

      {updateForm.show && (
        <CustomerReportForm
          reportId={updateForm.id || "default-id"}
          setUpdateForm={setUpdateForm}
        />
      )}
    </div>
  );
}
