import { Table, Tooltip } from "antd";
import useCheckRoleUser from "hook/useCheckRole";
import { formatDate } from "hook/useFormatDate";
import { formatNumberLargeDecimal } from "hook/useFormatNumber";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import SearchLayout from "./components/SearchLayout";
import { getListContractAction } from "store/contract/contract.actions";
import { useSelector } from "react-redux";

const ContactNumberManager = () => {
  const dispatch = useDispatch();
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [isLoadData, setIsLoadData] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const isRole = useCheckRoleUser();
  const [page] = useState(1);
  const [pageNumber] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filters, setFilter] = useState({});

  const { listContract } = useSelector((state) => state.contract);

  const getData = useCallback(() => {
    const params = {
      supplierId: filters?.supplierDTO,
      fromSignedDate: startDate && formatDate(startDate),
      projectId: filters?.projectDTO,
      toSignedDate: endDate && formatDate(endDate),
      pageNumber: page,
      pageSize: pageNumber,
    };
    dispatch(getListContractAction(params));
  }, [
    dispatch,
    endDate,
    filters?.projectDTO,
    filters?.supplierDTO,
    page,
    pageNumber,
    startDate,
  ]);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };
  useEffect(() => {
    getData();
  }, [getData]);

  const getDataSearch = useCallback(() => {
    let dataFilter = listContract?.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    setDataFilter(dataFilter);
  }, [listContract]);

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
      title: "Số hợp đồng",
      dataIndex: "contractNumber",
      key: "contractNumber",
      align: "center",
    },
    {
      title: "Ngày ký hợp đồng",
      key: "signedDate",
      align: "center",
      render: (item) => formatDate(item?.signedDate),
    },
    {
      title: "Dự án",
      key: "projectDTO",
      align: "center",
      render: (item) => item?.projectDTO?.name,
    },
    {
      title: "Tên nhà cung cấp",
      key: "supplierDTO",
      align: "center",
      render: (item) => item?.supplierDTO?.name,
    },
    {
      title: "Giá trị",
      key: "costValue",
      align: "center",
      render: (item) => formatNumberLargeDecimal(item?.costValue),
    },
    {
      title: "Đơn vị tiền tệ",
      dataIndex: "currencyTypeEnum",
      key: "currencyTypeEnum",
      align: "center",
    },
    {
      title: "Diễn giải thanh toán",
      dataIndex: "explainPaymentTerm",
      key: "explainPaymentTerm",
      align: "center",
    },
  ];

  if (isRole) {
    columns.push({
      title: "Thao tác",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Chỉnh sửa">
          <i
            onClick={() => {
              setDataSelect(record);
              setAddRequestFormEditOpen(true);
            }}
            style={{ cursor: "pointer" }}
            className="material-icons"
          >
            edit
          </i>
        </Tooltip>
      ),
    });
  }

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Danh mục</span>
          <h3 className="page-title">Danh mục hợp đồng</h3>
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
        listData={listContract}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        filters={filters}
        setFilter={setFilter}
      />
      <Table
        columns={columns}
        dataSource={dataFilter}
        pagination={{
          position: ["topRight"],
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100", "500", "1000"],
        }}
      />
      {isRequestFormCreateOpen && (
        <ModalCreate
          listData={listContract}
          isRequestFormCreateOpen={isRequestFormCreateOpen}
          setAddRequestFormCreateOpen={setAddRequestFormCreateOpen}
          checkLoadData={checkLoadData}
          getData={getData}
        />
      )}
      {isRequestFormEditOpen && (
        <ModalEdit
          listData={listContract}
          dataSelect={dataSelect}
          isRequestFormEditOpen={isRequestFormEditOpen}
          setAddRequestFormEditOpen={setAddRequestFormEditOpen}
          checkLoadData={checkLoadData}
          getData={getData}
        />
      )}
    </div>
  );
};

export default ContactNumberManager;
