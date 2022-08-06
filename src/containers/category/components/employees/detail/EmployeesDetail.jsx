import { Button, Descriptions, Empty, Table, Tooltip } from "antd";
import { GENDERS, ROLE_EMPLOYESS } from "config/constant";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";
import ModalCreate from "./ModalCreate";
import ModalEdit from "./ModalEdit";
import useCheckRoleUser from "hook/useCheckRole";
import ModalResetPass from "./ModalResetPass";

const EmployeesDetail = () => {
  const history = useHistory();
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [data, setData] = useState({});
  const [isLoadData, setIsLoadData] = useState(false);
  const [isResetPass, setIsResetPass] = useState(false);
  const isRole = useCheckRoleUser();
  const [isUser] = useState(!window.location.href.split("?")[1]);

  const roleResetPass = useMemo(() => {
    if (isRole) {
      return true;
    } else {
      return isUser;
    }
  }, [isRole, isUser]);

  const [idSupply] = useState(
    window.location.pathname.substr(
      window.location.pathname.lastIndexOf("/") + 1
    )
  );

  const getData = useCallback(async () => {
    // Call APi get data

    var result = await getParams(`/user/${idSupply}`);
    if (result) {
      setData(result || {});
    } else {
      setData({});
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  }, [idSupply]);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  useEffect(() => {
    getData();
  }, [getData, isLoadData]);

  const columns = [
    {
      title: "Tên viết tắt",
      key: "bankCode",
      align: "center",
      render: (item) => item?.bankInfoDTO?.bankCode,
    },
    {
      title: "Tên ngân hàng",
      key: "bankAccountInfoDTO",
      align: "center",
      render: (item) => item?.bankInfoDTO?.name,
    },
    {
      title: "Chủ tài khoản",
      dataIndex: "bankAccountName",
      key: "bankAccountName",
      align: "center",
    },
    {
      title: "Số tài khoản",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      align: "center",
    },
    {
      title: "Chi nhánh thành phố",
      dataIndex: "bankBranchCity",
      key: "bankBranchCity",
      align: "center",
    },
  ];

  if (isUser) {
    columns.push({
      title: "Thao tác",
      align: "center",
      key: "action",
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
    });
  }

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 text-center text-sm-left mb-0 d-flex justify-content-between">
          <div>
            <span className="text-uppercase page-subtitle">Chi tiết</span>
            <h3 className="page-title">Chi tiết nhân viên</h3>
          </div>
          {roleResetPass && (
            <div>
              <Button
                htmlType="button"
                onClick={() => setIsResetPass(true)}
                style={{ marginRight: "20px" }}
              >
                Reset mật khẩu
              </Button>
            </div>
          )}
        </div>
      </div>
      {data && // 👈 null and undefined check
        Object.keys(data)?.length !== 0 && (
          <>
            <Descriptions
              bordered
              style={{ marginRight: "16px", marginBottom: "16px" }}
            >
              <Descriptions.Item label="Tên đăng nhập" span={12}>
                {data?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Tên đầy đủ" span={12}>
                {data?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Mã nhân viên" span={12}>
                {data?.employeeCode}
              </Descriptions.Item>
              <Descriptions.Item label="Bộ phận" span={12}>
                {data?.departmentDTO?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Vai trò" span={12}>
                {
                  ROLE_EMPLOYESS?.filter((e) => e?.value === data?.role)[0]
                    ?.label
                }
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính" span={12}>
                {GENDERS?.filter((e) => e?.value === data?.gender)[0]?.label}
              </Descriptions.Item>
            </Descriptions>

            {!data?.bankAccountInfoDTO && (
              <div>
                <button
                  onClick={() => setAddRequestFormCreateOpen(true)}
                  className="mb-2 mr-1 btn btn-primary btn-sm"
                  style={{ fontSize: "15px" }}
                  disabled={!isRole}
                >
                  Thêm ngân hàng
                </button>
              </div>
            )}

            {data?.bankAccountInfoDTO && (
              <Table
                columns={columns}
                dataSource={[data?.bankAccountInfoDTO]}
                align="center"
                pagination={{
                  position: ["topRight"],
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100", "500", "1000"],
                }}
              />
            )}

            {isResetPass && (
              <ModalResetPass
                employeeCode={data?.employeeCode}
                isResetPass={isResetPass}
                setIsResetPass={setIsResetPass}
                checkLoadData={checkLoadData}
              />
            )}

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
        Object.keys(data)?.length === 0 &&
        Object.getPrototypeOf(data) === Object.prototype && (
          <>
            <Empty
              style={{ marginTop: "200px" }}
              description="Không tìm thấy dữ liệu"
            />
          </>
        )}
      <div>
        <Button
          htmlType="button"
          onClick={() => history.replace("/category/employee")}
          style={{ marginBottom: "20px" }}
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default EmployeesDetail;
