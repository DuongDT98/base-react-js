import React from "react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

const Datepicker = ({ onChange }) => {
  return (
    <div style={{ width: "100%", minHeight: "38px" }}>
      <DatePicker
        style={{ width: "100%", fontSize: "0.815rem", minHeight: "38px" }}
        onChange={onChange}
        placeholder="Chọn ngày"
      />
    </div>
  );
};

export default Datepicker;
