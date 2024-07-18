import ReportForm from "../../../components/adminForms/ReportForm";
import { useState } from "react";
export default function Reports() {
  const [showReportForm, setShowReportForm] = useState(false);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8">Manage reports</h1>
          <button
            className="bg-[#467FD0] px-3 py-2 rounded-xl"
            onClick={() => setShowReportForm(true)}
          >
            create report
          </button>
        </div>
      </div>
      {showReportForm && <ReportForm setShowReportForm={setShowReportForm} />}
    </div>
  );
}
