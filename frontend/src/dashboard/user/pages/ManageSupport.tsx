import DashHeader from "./DashHeader";

import { useGetReportsQuery } from "../../../features/api/vehiclesApi";
import { useSelector } from "react-redux";
import ContactReport from "../../../components/ContactReport";
import CustomerReportForm from "../../../components/userForm/CustomerReportForm";
import { useState } from "react";
import { RootState } from "../../../app/store";

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
    displayReports = <h1>fetching reports...</h1>;
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
      <div className="bg-black mt-8 rounded-2xl">{displayReports}</div>
      {updateForm.show && (
        <CustomerReportForm
          reportId={updateForm.id || "default-id"}
          setUpdateForm={setUpdateForm}
        />
      )}
    </div>
  );
}
