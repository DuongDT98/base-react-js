import { Table, Tooltip } from "antd";
import useCheckRoleUser from "hook/useCheckRole";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";
import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";

const SupplyManager = () => {
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [data, setData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const isRole = useCheckRoleUser();

  const history = useHistory();

  const getData = useCallback(async () => {
    // Call APi get data

    var result = await getParams("/bank-account-info?isCompanyAccount=true");
    if (result) {
      const dataTable = result?.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      console.log("dataTable", dataTable);
      setData(dataTable || []);
    } else {
      setData([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  }, []);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  useEffect(() => {
    getData();
  }, [getData, isLoadData]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
      align: "center",
    },
    {
      title: "Số tài khoản",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      width: "12%",
      align: "center",
    },
    {
      title: "Chủ tài khoản",
      dataIndex: "bankAccountName",
      key: "bankAccountName",
      width: "12%",
      align: "center",
    },
    {
      title: "Mã ngân hàng",
      key: "bankCode",
      width: "12%",
      align: "center",
      render: (item) => item?.bankInfoDTO?.bankCode,
    },
    {
      title: "Tên ngân hàng",
      key: "name",
      width: "12%",
      align: "center",
      render: (item) => item?.bankInfoDTO?.name,
    },
    {
      title: "Tên ngân hàng(ENG)",
      key: "enName",
      width: "12%",
      align: "center",
      render: (item) => item?.bankInfoDTO?.enName,
    },
    {
      title: "Chi nhánh thành phố",
      key: "bankBranchCity",
      dataIndex: "bankBranchCity",
      width: "12%",
      align: "center",
    },
    {
      title: "Quốc gia",
      key: "nation",
      width: "12%",
      align: "center",
      render: (item) => item?.bankInfoDTO?.nation,
    },
    {
      title: "Thao tác",
      width: "7%",
      align: "center",
      key: "action",
      render: (_, record) => (
        <>
          <Tooltip title="Xem chi tiết">
            <i
              onClick={() =>
                history.push(`/category/banks-of-company/detail/${record.id}`)
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
          <h3 className="page-title">Danh mục ngân hàng của công ty</h3>
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

      <Table
        columns={columns}
        dataSource={data}
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
          listData={data}
          isRequestFormCreateOpen={isRequestFormCreateOpen}
          setAddRequestFormCreateOpen={setAddRequestFormCreateOpen}
          checkLoadData={checkLoadData}
        />
      )}
      {isRequestFormEditOpen && (
        <ModalEdit
          listData={data}
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
