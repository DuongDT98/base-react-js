import { Table, Tooltip } from "antd";
import useCheckRoleUser from "hook/useCheckRole";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchLayout from "./SearchLayout";

const Request = () => {
  const history = useHistory();
  const [dataFilter, setDataFilter] = useState([]);
  const [filtersObj, setFilterObj] = useState({});
  const isRole = useCheckRoleUser();

  const getClassByStatis = (status) => {
    switch (status) {
      case "Đã duyệt":
        return "da-duyet";
      case "Đang chờ duyệt":
        return "cho-duyet";
      default:
        return "huy";
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
    },
    {
      title: "Người đề nghị",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 150,
    },
    {
      title: "Loại đề nghị",
      dataIndex: "typeSuggestions",
      key: "typeSuggestions",
      align: "center",
      width: 150,
    },
    {
      title: "Bên chịu phí",
      dataIndex: "employeeCode",
      key: "employeeCode",
      align: "center",
      width: 150,
    },
    {
      title: "Bộ phận chịu phí",
      key: "departmentId",
      align: "center",
      width: 150,
      render: (item) => item?.departmentDTO?.name,
    },
    {
      title: "Loại chi phí",
      key: "typeCost",
      align: "center",
      width: 150,
    },
    {
      title: "Bên nhận tiền",
      key: "role",
      align: "center",
      width: 150,
    },
    {
      title: "Ngày yêu cầu thanh toán",
      key: "createDate",
      align: "center",
      width: 150,
    },
    {
      title: "Số tiền",
      key: "money",
      align: "center",
      width: 150,
    },
    {
      title: "Loại tiền tệ",
      key: "typeMoney",
      align: "center",
      width: 150,
    },
    {
      title: "Hình thức thanh toán",
      key: "payments",
      align: "center",
      width: 150,
    },
    {
      title: "Trạng thái",
      key: "status",
      align: "center",
      fixed: "right",
      width: 150,
      render: (item) => (
        <span
          style={{ padding: "7px" }}
          className={getClassByStatis(item.status)}
        >
          {item.status}
        </span>
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Tooltip title="Xem chi tiết">
            <i
              onClick={() =>
                history.push(`/category/employee/detail/${record.employeeCode}`)
              }
              className="material-icons"
              style={{ marginRight: "6px", cursor: "pointer" }}
            >
              info
            </i>
          </Tooltip>
          {isRole && (
            <Tooltip title="Chỉnh sửa">
              <i
                // onClick={() => {
                //   setDataSelect(record);
                //   setAddRequestFormEditOpen(true);
                // }}
                className="material-icons"
                style={{ cursor: "pointer" }}
              >
                edit
              </i>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const fakeData = [
    {
      index: "1",
      email: "sdsadsa",
      createDate: "17/Apr/2022",
      typeSuggestions: "Nguyễn Văn A",
      employeeCode: "111",
      departmentId: "department 1",
      typeCost: "DN thanh toán",
      role: "CP VT",
      money: "sadsad",
      typeMoney: "2121",
      payments: "sdsads",
      status: "Đang chờ duyệt",
    },
    {
      index: "1",
      email: "sdsadsa",
      createDate: "17/Apr/2022",
      typeSuggestions: "Nguyễn Văn A",
      employeeCode: "111",
      departmentId: "department 1",
      typeCost: "DN thanh toán",
      role: "CP VT",
      money: "sadsad",
      typeMoney: "2121",
      payments: "sdsads",
      status: "Đang chờ duyệt",
    },
    {
      index: "1",
      email: "sdsadsa",
      createDate: "17/Apr/2022",
      typeSuggestions: "Nguyễn Văn A",
      employeeCode: "111",
      departmentId: "department 1",
      typeCost: "DN thanh toán",
      role: "CP VT",
      money: "sadsad",
      typeMoney: "2121",
      payments: "sdsads",
      status: "Đang chờ duyệt",
    },
  ];

  const getObjectFilter = (value) => {
    setFilterObj(value);
  };

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Tổng quan</span>
          <h3 className="page-title">Danh sách đề nghị</h3>
        </div>
      </div>

      <SearchLayout listData={fakeData} getObjectFilter={getObjectFilter} />

      <Table
        columns={columns}
        dataSource={fakeData}
        align="center"
        scroll={{ x: 1300 }}
        pagination={{
          position: ["topRight"],
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100", "500", "1000"],
        }}
      />

      {/* <button
        onClick={() => history.push("/request/add")}
        className="mb-2 mr-1 btn btn-primary btn-sm"
        style={{ fontSize: "15px" }}
      >
        Thêm Đề Nghị
      </button> */}
    </div>
  );
};

export default Request;
