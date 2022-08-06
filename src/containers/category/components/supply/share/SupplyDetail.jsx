import { Breadcrumb, Descriptions, Empty, Table, Tooltip } from "antd";
import useCheckRoleUser from "hook/useCheckRole";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";
import ModalCreate from "./ModalCreate";
import ModalEdit from "./ModalEdit";

const SupplyDetail = () => {
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [data, setData] = useState({});
  const [isLoadData, setIsLoadData] = useState(false);
  const [listBank, setListBank] = useState([]);

  var history = useHistory();
  //Role
  const isRole = useCheckRoleUser();

  const [idSupply, setIdSupply] = useState(
    window.location.pathname.substr(
      window.location.pathname.lastIndexOf("/") + 1
    )
  );

  // console.log(history.getParams("id"));

  const getData = async () => {
    // Call APi get data

    var result = await getParams(`/supplier/${idSupply}`);
    if (result) {
      setData(result || {});

      let dataBankFilter = result?.bankAccountInfoDTOS?.map((item, index) => ({
        ...item,
        index: index + 1,
        bankCode: item.bankInfoDTO.bankCode,
        bankName: item.bankInfoDTO.name,
      }));
      setListBank(dataBankFilter);
    } else {
      setData({});
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  useEffect(() => {
    getData();
  }, [isLoadData]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "50px",
      align: "center",
    },
    {
      title: "Mã ngân hàng",
      dataIndex: "bankCode",
      key: "bankCode",
      align: "center",
      width: "200px",
    },
    {
      title: "Tên ngân hàng",
      dataIndex: "bankName",
      key: "bankName",

      align: "center",
      width: "20%",
    },
    {
      title: "Chủ tài khoản",
      dataIndex: "bankAccountName",
      key: "bankAccountName",
      align: "center",
      width: "20%",
    },
    {
      title: "Số tài khoản",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      align: "center",
      width: "20%",
    },
    {
      title: "Địa chỉ",
      key: "bankBranchCity",
      dataIndex: "bankBranchCity",
      align: "center",
      width: "20%",
    },
    {
      title: "Thao tác",
      align: "center",
      key: "action",
      width: "200px",
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
          <Breadcrumb>
            <Breadcrumb.Item
              style={{ textTransform: "uppercase", fontSize: "10px" }}
              onClick={() => history.push("/category/supply")}
            >
              Danh mục nhà cung cấp
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{ textTransform: "uppercase", fontSize: "10px" }}
            >
              <a href="">Chi tiết</a>
            </Breadcrumb.Item>
          </Breadcrumb>

          <h3 className="page-title">Chi tiết nhà cung cấp</h3>
        </div>
      </div>
      {data && // 👈 null and undefined check
        Object.keys(data).length !== 0 && (
          <>
            <Descriptions
              bordered
              style={{ marginRight: "16px", marginBottom: "16px" }}
            >
              <Descriptions.Item label="Tên nhà cung cấp" span={12}>
                {data.name}
              </Descriptions.Item>

              <Descriptions.Item label="Mã số thuế" span={12}>
                {data.taxCode}
              </Descriptions.Item>
            </Descriptions>
            <div>
              <button
                onClick={() => setAddRequestFormCreateOpen(true)}
                className="mb-2 mr-1 btn btn-primary btn-sm"
                style={{ fontSize: "15px" }}
              >
                Thêm tài khoản ngân hàng
              </button>
            </div>

            <Table
              columns={columns}
              dataSource={listBank}
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
                data={data}
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
          </>
        )}
      {data && // 👈 null and undefined check
        Object.keys(data).length === 0 &&
        Object.getPrototypeOf(data) === Object.prototype && (
          <>
            {" "}
            <Empty
              style={{ marginTop: "200px" }}
              description="Không tìm thấy dữ liệu"
            />
          </>
        )}
    </div>
  );
};

export default SupplyDetail;
