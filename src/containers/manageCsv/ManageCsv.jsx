import React, { useState } from "react";
import ManagerTable from "./ManagerCsvTable";

const ManageCsv = () => {
  const [setRow] = useState(null);

  return (
    <div className="csv">
      <div className="csv-title">Quản lý thanh toán</div>
      <ManagerTable setRow={setRow} />
    </div>
  );
};

export default ManageCsv;
