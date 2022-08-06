import { Divider, Typography } from "antd";

const { Title } = Typography;

const UserDetailView = ({ user, roleUser }) => {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item p-3">
        <div className="row">
          <div className="col">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="feFirstName" style={{ fontWeight: 600 }}>
                    Tên đầy đủ
                  </label>
                  <div>{user.fullName}</div>
                </div>

                <div className="form-group col-md-6">
                  <label for="feEmailAddress" style={{ fontWeight: 600 }}>
                    Email
                  </label>
                  <div>{user.email}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="feEmailAddress" style={{ fontWeight: 600 }}>
                    Mã nhân viên
                  </label>
                  <div>{user.employeeCode}</div>
                </div>
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Giới tính
                  </label>
                  <div>
                    {user.gender === "MALE"
                      ? "Nam"
                      : user.gender === "FEMALE"
                      ? "Nữ"
                      : "Không xác định"}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Phòng ban
                  </label>
                  <div>{user?.departmentDTO?.name}</div>
                </div>

                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Chức danh
                  </label>
                  <div>{roleUser}</div>
                </div>
              </div>

              {/* <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="feDescription">Thông tin ngoài</label>
                          <textarea
                            className="form-control"
                            name="feDescription"
                            rows="5"
                            defaultValue="GIao diện thân thiện với người dùng"
                          ></textarea>
                        </div>
                      </div> */}
            </form>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default UserDetailView;
