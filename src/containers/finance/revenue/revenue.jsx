import { Table, Tag, Tooltip } from "antd";
import useCheckRoleUser from "hook/useCheckRole";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";
import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import SearchLayout from "./components/SearchLayout";

const RevenueManager = () => {
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [data, setData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  // filter data
  const [filtersObj, setFilterObj] = useState({});
  const [dataFilter, setDataFilter] = useState([]);
  //Role
  const isRole = useCheckRoleUser();

  console.log(isRequestFormCreateOpen);

  const history = useHistory();

  const getData = async () => {
    // Call APi get data

    var result = await getParams("/revenue");
    if (result) {
      setData(result.data || []);
    } else {
      setData([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  useEffect(() => {
    getData();
  }, [isLoadData]);

  // filter data
  useEffect(() => {
    getDataSearch(filtersObj);
  }, [filtersObj, data]);

  const getObjectFilter = (value) => {
    setFilterObj(value);
  };
  const getDataSearch = (value) => {
    let filtersArr =
      value != undefined
        ? data?.filter((item) => {
            for (const property in value) {
              if (
                !item[property]
                  ?.toLowerCase()
                  ?.includes(value[property]?.toLowerCase())
              )
                return false;
            }
            return true;
          })
        : data;
    let dataFilter = filtersArr?.map((item, index) => ({
      ...item,
      index: index + 1,
    }));

    setDataFilter(dataFilter);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "50px",
      align: "center",
    },
    {
      title: "Tên dự án",
      dataIndex: "projectDTO",
      key: "projectDTO",
      align: "center",
      width: "500px",
      render: (value) => <Tooltip title={value.name}>{value.name}</Tooltip>,
    },
    {
      title: "Số tiền",
      dataIndex: "costValue",
      key: "costValue",
      align: "center",
      width: "200px",
      render: (value) =>
        parseFloat(value)
          .toFixed(2)
          ?.replace(/\d(?=(\d{3})+\.)/g, "$&,"),
    },
    {
      title: "Loại tiền tệ",
      key: "currencyType",
      dataIndex: "currencyType",
      align: "center",
      width: "150px",
    },
    {
      title: "Trạng thái",
      key: "revenueStatus",
      dataIndex: "revenueStatus",
      align: "center",
      width: "300px",
      render: (value) => {
        // eslint-disable-next-line default-case
        switch (value) {
          case "DANG_CHO":
            // code block
            return <Tag color="warning">Đang chờ</Tag>;
            break;
          case "DA_THU":
            // code block
            return <Tag color="success">Đã thu</Tag>;
          case "HUY":
            // code block
            return <Tag color="error">Hủy</Tag>;
            break;
        }
      },
    },
    {
      title: "Số hóa đơn",
      key: "receiptNumber",
      dataIndex: "receiptNumber",
      align: "center",
      width: "300px",
    },
    {
      title: "Người tạo",
      key: "createdUserDTO",
      dataIndex: "createdUserDTO",
      align: "center",
      width: "300px",
      render: (value) => (
        <>
          <div>{value.fullName}</div>
          <div style={{ marginTop: "4px" }}>{value.email}</div>
        </>
      ),
    },
    {
      title: "Người sửa gần nhất",
      key: "updatedUserDTO",
      dataIndex: "updatedUserDTO",
      align: "center",
      width: "300px",
      render: (value) =>
        value ? (
          <>
            <div>{value?.fullName}</div>
            <div style={{ marginTop: "4px" }}>{value?.email}</div>
          </>
        ) : (
          "-"
        ),
    },
    {
      title: "Tên ngân hàng nhận",
      key: "bankAccountInfoDTO",
      dataIndex: "bankAccountInfoDTO",
      align: "center",
      width: "400px",
      render: (value) => (
        <>
          <div>{value?.bankInfoDTO?.name}</div>
          <div style={{ marginTop: "4px" }}>
            STK: {value?.bankAccountNumber}
          </div>
        </>
      ),
    },
    {
      title: "Ngày dự kiến thu",
      key: "expectedDate",
      dataIndex: "expectedDate",
      align: "center",
      width: "300px",
    },
    {
      title: "Ngày nhận",
      key: "receivedDate",
      dataIndex: "receivedDate",
      align: "center",
      width: "300px",
    },
    {
      title: "Thao tác",
      align: "center",
      key: "action",
      fixed: "right",
      width: "100px",
      render: (_, record) => (
        <>
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
          <span className="text-uppercase page-subtitle">Tài chính</span>
          <h3 className="page-title">Quản lý thu</h3>
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

      {data.length > 0 && (
        <SearchLayout listData={data} getObjectFilter={getObjectFilter} />
      )}

      <Table
        columns={columns}
        dataSource={dataFilter}
        align="center"
        scroll={{ x: "100%" }}
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

export default RevenueManager;
