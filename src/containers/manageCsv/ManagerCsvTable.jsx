import React from "react";
import { note } from "components/svg/index";

const ManagerCsvTable = ({ data, setRow }) => {
  const fakeData = [
    {
      id: "22-1",
      customer: "abc",
      type: "tạm ứng",
      request_time: "12/02/2022",
      request_emp: "Nguyen Van A",
      money: "100,000,000",
      res_time: "12/02/2022",
      back_time: "12/02/2022",
    },
    {
      id: "22-1",
      customer: "abc",
      type: "tạm ứng",
      request_time: "12/02/2022",
      request_emp: "Nguyen Van B",
      money: "100,000,000",
      res_time: "12/02/2022",
      back_time: "12/02/2022",
    },
    {
      id: "22-1",
      customer: "abc",
      type: "tt trả sau",
      request_time: "12/02/2022",
      request_emp: "Nguyen Van C",
      money: "100,000,000",
      res_time: "12/02/2022",
      back_time: "12/02/2022",
    },
    {
      id: "22-1",
      customer: "abc",
      type: "tt trả sau",
      request_time: "12/02/2022",
      request_emp: "Nguyen Van D",
      money: "100,000,000",
      res_time: "12/02/2022",
      back_time: "12/02/2022",
    },
  ];
  return (
    <table className="csv-table" style={{minWidth:"1000px"}}>
      <thead>
        <tr>
          <th className="csv-table-th">STT</th>
          <th className="csv-table-th">Mã KH</th>
          <th className="csv-table-th">Loại HS</th>
          <th className="csv-table-th">Ngày đề nghị</th>
          <th className="csv-table-th">Người đề nghị</th>
          <th className="csv-table-th">Số tiền</th>
          <th className="csv-table-th">Ngày thanh toán</th>
          <th className="csv-table-th">Ngày hoàn ứng</th>
          <th className="csv-table-th">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {fakeData.map((item, index) => (
          <tr key={index}>
            <td className="csv-table-td">{item.id}</td>
            <td className="csv-table-td">{item.customer}</td>
            <td className="csv-table-td">{item.type}</td>
            <td className="csv-table-td">{item.request_time}</td>
            <td className="csv-table-td">{item.request_emp}</td>
            <td className="csv-table-td">{item.money}</td>
            <td className="csv-table-td">{item.res_time}</td>
            <td className="csv-table-td">{item.back_time}</td>
            <td className="csv-table-td">
              <img src={note} alt="pencil" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManagerCsvTable;
