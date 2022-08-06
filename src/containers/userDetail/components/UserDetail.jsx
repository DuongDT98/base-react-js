import { KeyOutlined } from "@ant-design/icons";
import { Button, Form, Typography } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getParams, patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import BankUserCreate from "./BankUserCreate";
import BankUserDetail from "./BankUserDetail";
import { UpdateCurrentPassword } from "./UpdatePassword";
import UserBankInfoEdit from "./UserBankInfoEdit";
import UserDetailEdit from "./UserDetailEdit";
import UserDetailView from "./UserDetailView";

const { Title } = Typography;

const UserDetail = () => {
  console.log("userdetail");
  const [roleUser, setRoleUser] = useState("");
  const [isEditInfo, setisEditInfo] = useState(false);
  const [isEditBankInfo, setisEditBankInfo] = useState(false);
  const [user, setUser] = useState({});
  const [checkBankAccount, setCheckBankAccount] = useState(false);
  const [form] = Form.useForm();
  const [formBank] = Form.useForm();
  const [isAddBank, setIsAddBank] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isUpdatePass, setIsUpdatePass] = useState(false);

  const getUserDetail = async () => {
    // Call APi get data

    var result = await getParams("/user/me");
    if (result) {
      setUser(result || {});
      if (result?.bankAccountInfoDTO?.bankAccountNumber) {
        setCheckBankAccount(true);
      }
      // eslint-disable-next-line default-case
      switch (result.role) {
        case "ROLE_ADMIN":
          // code block
          setRoleUser("Admin");
          break;
        case "ROLE_DIRECTOR":
          // code block
          setRoleUser("Giám đốc");
          break;
        case "ROLE_VICE_DIRECTOR":
          // code block
          setRoleUser("Phó giám đốc");
          break;
        case "ROLE_MANAGER":
          // code block
          setRoleUser("Trưởng bộ phận");
          break;
        case "ROLE_VICE_MANAGER":
          // code block
          setRoleUser("Phó trưởng bộ phận");
          break;
        case "ROLE_MEMBER":
          // code block
          setRoleUser("Nhân viên");
          break;
      }
    } else {
      setUser({});
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };
  useEffect(() => {
    getUserDetail();
  }, []);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  useEffect(() => {
    getUserDetail();
  }, [isLoadData]);

  const handleChangeUserInfo = async () => {
    let data = {
      fullName: form.getFieldValue("fullName").trim(),
      gender: form.getFieldValue("gender").trim(),
    };
    const result = await patch("/user", data);
    if (result) {
      toast("Sửa thành công", optionsSuccess);
      setisEditInfo(false);
      setIsLoadData(!isLoadData);
    } else {
      toast("Sửa thất bại. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const handleChangeUserBankInfo = async () => {
    let data = {
      bankAccountName: formBank.getFieldValue("bankAccountName").trim(),
      bankAccountNumber: formBank.getFieldValue("bankAccountNumber").trim(),
      bankBranchCity: formBank.getFieldValue("bankBranchCity"),
      bankInfoCode: formBank.getFieldValue("bankCode"),
    };
    console.log(data);
    const result = await patch(
      `/bank-account-info/${user.bankAccountInfoDTO.id}`,
      data
    );
    if (result) {
      toast("Sửa thành công", optionsSuccess);
      setisEditBankInfo(false);
      setIsLoadData(!isLoadData);
    } else {
      toast("Sửa thất bại. Vui lòng thử lại sau!!!", optionsError);
    }
  };
  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Tổng quan</span>
          <h3 className="page-title">Thông tin nhân viên</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card card-small mb-4 pt-3">
            <div className="card-header border-bottom text-center">
              <div className="mb-3 mx-auto">
                {user.gender === "MALE" ? (
                  <img
                    className="rounded-circle"
                    src="/avatar-male.png"
                    alt="User Avatar"
                    width="110"
                  />
                ) : user.gender === "FEMALE" ? (
                  <img
                    className="rounded-circle"
                    src="/avatar-female.png"
                    alt="User Avatar"
                    width="110"
                  />
                ) : (
                  <img
                    className="rounded-circle"
                    src="/avatar-unknown.png"
                    alt="User Avatar"
                    width="110"
                  />
                )}

                <h4 className="mb-0">{roleUser}</h4>
                {roleUser === "Admin" && (
                  <span className="text-muted d-block mb-2">Quản trị viên</span>
                )}
                <Button
                  type="primary"
                  icon={<KeyOutlined />}
                  onClick={() => setIsUpdatePass(true)}
                >
                  Đổi mật khẩu
                </Button>
                {isUpdatePass && (
                  <UpdateCurrentPassword
                    isRequestFormEdit={isUpdatePass}
                    setAddRequestFormEdit={setIsUpdatePass}
                    checkLoadData={checkLoadData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div>
            <div className="card card-small mb-4">
              <div className="card-header border-bottom">
                <Title level={4} style={{ display: "inline-block" }}>
                  Thông tin người dùng
                </Title>
                {!isEditInfo && (
                  <button
                    type="submit"
                    className="btn btn-accent"
                    style={{
                      fontSize: "15px",
                      float: "right",
                      display: "inline-block",
                    }}
                    onClick={() => setisEditInfo(true)}
                  >
                    Cập nhập thông tin cá nhân
                  </button>
                )}
                {isEditInfo && (
                  <>
                    <Button
                      type="primary"
                      danger
                      style={{
                        fontSize: "15px",
                        float: "right",
                        display: "inline-block",
                      }}
                      onClick={() => setisEditInfo(false)}
                    >
                      Hủy bỏ
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        fontSize: "15px",
                        float: "right",
                        display: "inline-block",
                      }}
                      onClick={handleChangeUserInfo}
                    >
                      Lưu
                    </Button>
                  </>
                )}
              </div>
              {!isEditInfo && (
                <UserDetailView user={user} roleUser={roleUser} />
              )}
              {isEditInfo && (
                <UserDetailEdit user={user} roleUser={roleUser} form={form} />
              )}
            </div>
          </div>

          <div className="card card-small mb-4">
            <div className="card-header border-bottom">
              <Title level={4} style={{ display: "inline-block" }}>
                Thông tin ngân hàng
              </Title>
              {!checkBankAccount && (
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{
                    fontSize: "15px",
                    float: "right",
                    display: "inline-block",
                  }}
                  onClick={() => setIsAddBank(true)}
                >
                  Thêm thông tin ngân hàng
                </button>
              )}
              {!isEditBankInfo && checkBankAccount == true && (
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{
                    fontSize: "15px",
                    float: "right",
                    display: "inline-block",
                  }}
                  onClick={() => setisEditBankInfo(true)}
                >
                  Cập nhập tài khoản ngân hàng
                </button>
              )}
              {isEditBankInfo && (
                <>
                  <Button
                    type="primary"
                    danger
                    style={{
                      fontSize: "15px",
                      float: "right",
                      display: "inline-block",
                    }}
                    onClick={() => setisEditBankInfo(false)}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      fontSize: "15px",
                      float: "right",
                      display: "inline-block",
                    }}
                    onClick={handleChangeUserBankInfo}
                  >
                    Lưu
                  </Button>
                </>
              )}
            </div>
            {!isEditBankInfo && checkBankAccount == true && (
              <BankUserDetail user={user} roleUser={roleUser} />
            )}
            {isEditBankInfo && checkBankAccount == true && (
              <UserBankInfoEdit user={user} form={formBank} />
            )}
            {isAddBank && (
              <BankUserCreate
                user={user}
                isRequestFormCreateOpen={isAddBank}
                setAddRequestFormCreateOpen={setIsAddBank}
                checkLoadData={checkLoadData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
