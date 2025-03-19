import HistoryContainer from "@/components/history/historyContainer/historyContainer";
import PageHeader from "@/components/pageHeader/pageHeader";
import React from "react";

function HistoryPage() {
  return (
    <div className="p-6 pb-[6.5rem]">
      {/* <PageHeader>History Page</PageHeader> */}
      <HistoryContainer />
    </div>
  );
}

export default HistoryPage;
