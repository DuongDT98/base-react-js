import { Select } from "components/index.js";
import { departments, userRoles } from "helpers/constants.js";
import React, { useState } from "react";

const AddUser = () => {
  console.log("userdetail");
  const [user, setUser] = useState({
    name: null,
    department: null,
    role: null,
    email: null,
    gender: null,
    address: null,
    userName: null,
  });

  const handleChangeDepartment = (department) => {
    setUser({
      ...user,
      department,
    });
  };

  const handleChangeRole = (role) => {
    setUser({
      ...user,
      role,
    });
  };

  return (
    <div className="card card-small">
      <div className="border-bottom card-header">
        <h6 className="m-0">Thêm Nhân Viên</h6>
      </div>

      <ul className="list-group list-group-flush">
        <li className="p-3 list-group-item">
          <div className="row">
            <div className="col">
              <form className="">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="feInputCity">Phòng ban</label>
                    <Select
                      options={departments}
                      option={user.department}
                      handleChange={handleChangeDepartment}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="feInputCity">Vai trò</label>
                    <Select
                      options={userRoles}
                      option={user.role}
                      handleChange={handleChangeRole}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="feEmailAddress">Email</label>
                    <input
                      id="feEmailAddress"
                      type="email"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="username">Tên đăng nhập</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Tên Đăng Nhập"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="fePassword">Mật khẩu</label>
                    <input
                      id="fePassword"
                      type="password"
                      placeholder="Mật khẩu"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="CfPassword">Xác nhận mật khẩu</label>
                    <input
                      id="CfPassword"
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* <div className="form-row">
                  <div className="form-group col-md-12">
                    <label for="feInputAddress">Địa chỉ</label>
                    <input
                      id="feInputAddress"
                      placeholder=""
                      className="form-control"
                    />
                  </div>
                </div> */}
                <div className="form-row">
                  <button
                    style={{ fontSize: "0.815rem" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Thêm Nhân Viên
                  </button>
                </div>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AddUser;
