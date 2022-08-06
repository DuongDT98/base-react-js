import { Table, Tooltip } from "antd";
import { ROLE_EMPLOYESS, GENDERS } from "config/constant";
import useCheckRoleUser from "hook/useCheckRole";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import SearchLayout from "./components/SearchLayout";
import { getListEmployeesAction } from "store/employees/employees.actions";
import { useSelector } from "react-redux";

const SupplyManager = () => {
  const dispatch = useDispatch();
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [filters, setFilter] = useState({});
  const [isLoadData, setIsLoadData] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const isRole = useCheckRoleUser();
  const [page] = useState(1);
  const [pageNumber] = useState(10);
  const { listEmployees } = useSelector((state) => state?.employees);

  const history = useHistory();

  const getData = useCallback(() => {
    const params = {
      email: filters?.email,
      departmentId: filters?.departmentId,
      fullName: filters?.fullName,
      employeeCode: filters?.employeeCode,
      pageNumber: page,
      pageSize: pageNumber,
    };
    dispatch(getListEmployeesAction(params));
  }, [
    dispatch,
    filters?.departmentId,
    filters?.email,
    filters?.employeeCode,
    filters?.fullName,
    page,
    pageNumber,
  ]);

  useEffect(() => {
    getData();
  }, [getData, isLoadData]);

  const getDataSearch = useCallback(() => {
    let dataFilter = listEmployees?.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    setDataFilter(dataFilter);
  }, [listEmployees]);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  useEffect(() => {
    getDataSearch();
  }, [getDataSearch]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "50px",
      align: "center",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "employeeCode",
      key: "employeeCode",
      align: "center",
    },
    {
      title: "Bộ phận",
      key: "departmentId",
      align: "center",
      render: (item) => item?.departmentDTO?.name,
    },
    {
      title: "Vai trò",
      key: "role",
      align: "center",
      render: (item) =>
        ROLE_EMPLOYESS?.filter((e) => e?.value === item?.role)[0]?.label,
    },
    {
      title: "Giới tính",
      key: "gender",
      align: "center",
      render: (item) =>
        GENDERS?.filter((e) => e?.value === item?.gender)[0]?.label,
    },
    {
      title: "Thao tác",
      align: "center",
      key: "action",
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
                onClick={() => {
                  setDataSelect(record);
                  setAddRequestFormEditOpen(true);
                }}
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

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Danh mục</span>
          <h3 className="page-title">Danh mục nhân viên</h3>
        </div>
      </div>
      {isRole && (
        <div>
          <button
            onClick={() => setAddRequestFormCreateOpen(true)}
            className="mb-2 mr-1 btn btn-primary btn-sm"
            style={{ fontSize: "15px" }}
          >
            Thêm
          </button>
        </div>
      )}

      <SearchLayout
        listData={listEmployees}
        filters={filters}
        setFilter={setFilter}
      />

      <Table
        columns={columns}
        dataSource={dataFilter}
        align="center"
        pagination={{
          position: ["topRight"],
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100", "500", "1000"],
        }}
      />

      {isRequestFormCreateOpen && (
        <ModalCreate
          listData={listEmployees}
          isRequestFormCreateOpen={isRequestFormCreateOpen}
          setAddRequestFormCreateOpen={setAddRequestFormCreateOpen}
          checkLoadData={checkLoadData}
          getData={getData}
        />
      )}
      {isRequestFormEditOpen && (
        <ModalEdit
          listData={listEmployees}
          dataSelect={dataSelect}
          isRequestFormEditOpen={isRequestFormEditOpen}
          setAddRequestFormEditOpen={setAddRequestFormEditOpen}
          checkLoadData={checkLoadData}
        />
      )}
    </div>
  );
};

export default SupplyManager;
